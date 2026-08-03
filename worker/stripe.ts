import type { Env } from "./env";
import { plans } from "../src/data/plans";

const TIMESTAMP_TOLERANCE_SECONDS = 5 * 60;

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string,
): Promise<boolean> {
  const parts: Record<string, string> = {};
  for (const part of signatureHeader.split(",")) {
    const [key, value] = part.split("=");
    if (key && value) parts[key] = value;
  }

  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > TIMESTAMP_TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signedPayload = `${timestamp}.${payload}`;
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload),
  );

  return timingSafeEqual(toHex(sigBuffer), signature);
}

function matchPlan(amountTotal: number, currency: string) {
  if (currency.toLowerCase() !== "sgd") return undefined;
  return plans.find((plan) => Math.round(plan.monthlyFee * 100) === amountTotal);
}

async function notifyTeam(env: Env, record: {
  email: string;
  name: string;
  planName: string;
  amountTotal: number;
  currency: string;
}): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.SUBSCRIBER_NOTIFICATION_EMAIL) {
    console.warn(
      "stripe-webhook: RESEND_API_KEY or SUBSCRIBER_NOTIFICATION_EMAIL not configured, skipping notification email",
    );
    return false;
  }

  const amount = (record.amountTotal / 100).toFixed(2);
  const html = `<h2>New PrintOne subscriber - prepare for delivery</h2><ul>
    <li><strong>Name:</strong> ${record.name || "(not provided)"}</li>
    <li><strong>Email:</strong> ${record.email || "(not provided)"}</li>
    <li><strong>Plan:</strong> ${record.planName}</li>
    <li><strong>Amount:</strong> ${record.currency.toUpperCase()} ${amount}/month</li>
  </ul>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL || "PrintOne Subscribers <enquiries@epsonprintone.com>",
      to: env.SUBSCRIBER_NOTIFICATION_EMAIL,
      subject: `New subscriber - ${record.planName}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("stripe-webhook: failed to send notification email", await response.text());
    return false;
  }

  return true;
}

export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error("stripe-webhook: STRIPE_WEBHOOK_SECRET not configured");
    return new Response("Webhook not configured", { status: 500 });
  }

  const signatureHeader = request.headers.get("Stripe-Signature");
  if (!signatureHeader) {
    return new Response("Missing signature", { status: 400 });
  }

  const rawBody = await request.text();
  const valid = await verifyStripeSignature(rawBody, signatureHeader, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response("Invalid signature", { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid payload", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true, skipped: true });
  }

  const session = event.data?.object;
  if (!session || session.mode !== "subscription") {
    return Response.json({ received: true, skipped: true });
  }

  const email = session.customer_details?.email || session.customer_email || "";
  const name = session.customer_details?.name || "";
  const amountTotal = Number(session.amount_total) || 0;
  const currency = String(session.currency || "sgd");
  const plan = matchPlan(amountTotal, currency);
  const planName = plan?.name || "Unknown plan";

  try {
    await env.DB.prepare(
      `INSERT OR IGNORE INTO subscribers
        (stripe_session_id, stripe_customer_id, stripe_subscription_id, email, name, plan_slug, plan_name, amount_total, currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        session.id,
        session.customer || null,
        session.subscription || null,
        email,
        name,
        plan?.slug || null,
        planName,
        amountTotal,
        currency,
      )
      .run();
  } catch (err) {
    console.error("stripe-webhook: failed to write subscriber record", err);
  }

  const notified = await notifyTeam(env, { email, name, planName, amountTotal, currency });

  return Response.json({ received: true, notified });
}
