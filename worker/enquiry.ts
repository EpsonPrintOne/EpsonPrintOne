interface AssetsFetcher {
  fetch(request: Request): Promise<Response>;
}

export interface Env {
  ASSETS: AssetsFetcher;
  RESEND_API_KEY?: string;
  ENQUIRY_NOTIFICATION_EMAIL?: string;
  ENQUIRY_FROM_EMAIL?: string;
}

interface EnquiryPayload {
  name?: unknown;
  mobile?: unknown;
  email?: unknown;
  customer_type?: unknown;
  plan?: unknown;
  postal_code?: unknown;
  contact_method?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTAL_CODE_RE = /^[0-9]{6}$/;
const CUSTOMER_TYPES = new Set(["home", "business"]);
const CONTACT_METHODS = new Set(["phone", "email", "whatsapp"]);

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: EnquiryPayload): string | null {
  if (!asString(payload.name)) return "Full name is required.";
  if (!asString(payload.mobile)) return "Mobile number is required.";
  const email = asString(payload.email);
  if (!email || !EMAIL_RE.test(email)) return "A valid email address is required.";
  if (!CUSTOMER_TYPES.has(asString(payload.customer_type))) {
    return "Customer type is required.";
  }
  if (!asString(payload.plan)) return "Selected plan is required.";
  if (!POSTAL_CODE_RE.test(asString(payload.postal_code))) {
    return "A valid 6-digit Singapore postal code is required.";
  }
  if (!CONTACT_METHODS.has(asString(payload.contact_method))) {
    return "Preferred contact method is required.";
  }
  if (payload.consent !== true) return "Consent to be contacted is required.";
  return null;
}

async function sendNotification(
  env: Env,
  payload: EnquiryPayload,
): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.ENQUIRY_NOTIFICATION_EMAIL) {
    console.warn(
      "enquiry: RESEND_API_KEY or ENQUIRY_NOTIFICATION_EMAIL not configured, skipping notification email",
    );
    return false;
  }

  const fields: [string, string][] = [
    ["Name", asString(payload.name)],
    ["Mobile", asString(payload.mobile)],
    ["Email", asString(payload.email)],
    ["Customer type", asString(payload.customer_type)],
    ["Selected plan", asString(payload.plan)],
    ["Postal code", asString(payload.postal_code)],
    ["Preferred contact method", asString(payload.contact_method)],
    ["Message", asString(payload.message) || "(none)"],
  ];

  const html = `<h2>New PrintOne enquiry</h2><ul>${fields
    .map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`)
    .join("")}</ul>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL || "PrintOne Enquiries <enquiries@epsonprintone.com>",
      to: env.ENQUIRY_NOTIFICATION_EMAIL,
      subject: `New PrintOne enquiry — ${asString(payload.name)}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("enquiry: failed to send notification email", await response.text());
    return false;
  }

  return true;
}

export async function handleEnquiry(request: Request, env: Env): Promise<Response> {
  let payload: EnquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field, humans never see it.
  if (asString(payload.website)) {
    return Response.json({ ok: true });
  }

  const validationError = validate(payload);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const notified = await sendNotification(env, payload);

  return Response.json({ ok: true, notified });
}
