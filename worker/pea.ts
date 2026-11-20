import type { Env } from "./env";

// Helpers and the order-confirmation lookup for the Print-IQ Epson Advantage
// (/pea) microsite. Checkout itself is Stripe-hosted (Payment Links).

export const PEA_PRODUCT_MARKER = "Epson Advantage";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function orderReference(sessionId: string): string {
  return `PEA-${sessionId.slice(-8).toUpperCase()}`;
}

function shippingDetailsOf(session: any): any {
  return session.shipping_details || session.collected_information?.shipping_details || null;
}

export function formatDeliveryAddress(session: any): string {
  const shipping = shippingDetailsOf(session);
  const address = shipping?.address;
  if (!address) return "";
  const country = address.country === "SG" ? "Singapore" : address.country || "";
  return [
    shipping.name,
    address.line1,
    address.line2,
    [country, address.postal_code].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
}

export function customFieldValue(session: any, key: string): string {
  const field = (session.custom_fields || []).find((f: any) => f.key === key);
  return field?.text?.value || "";
}

export async function handlePeaOrder(request: Request, env: Env): Promise<Response> {
  const headers = { "Cache-Control": "no-store, private" };
  const sessionId = new URL(request.url).searchParams.get("session_id") || "";

  if (!/^cs_(live|test)_[A-Za-z0-9]{10,200}$/.test(sessionId)) {
    return Response.json({ error: "Invalid session." }, { status: 400, headers });
  }
  if (!env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Not available." }, { status: 503, headers });
  }

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items`,
    { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } },
  );
  if (!response.ok) {
    return Response.json({ error: "Order not found." }, { status: 404, headers });
  }

  const session: any = await response.json();
  const items = (session.line_items?.data || []).map((item: any) => ({
    description: String(item.description || "Epson product"),
    quantity: Number(item.quantity) || 1,
  }));

  // Only expose Epson Advantage orders through this endpoint.
  if (!items.some((item: { description: string }) => item.description.includes(PEA_PRODUCT_MARKER))) {
    return Response.json({ error: "Order not found." }, { status: 404, headers });
  }

  return Response.json(
    {
      reference: orderReference(sessionId),
      items: items.map((item: { description: string; quantity: number }) => ({
        description: item.description.replace(/\s*-\s*Print-IQ Epson Advantage$/i, ""),
        quantity: item.quantity,
      })),
      amountTotal: Number(session.amount_total) || 0,
      currency: String(session.currency || "sgd"),
      paymentStatus: session.payment_status === "paid" ? "Paid" : "Pending",
      deliveryAddress: formatDeliveryAddress(session),
    },
    { headers },
  );
}
