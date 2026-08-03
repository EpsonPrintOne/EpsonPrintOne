import type { Env } from "./env";

interface SubscriberRow {
  id: number;
  email: string;
  name: string;
  plan_name: string;
  amount_total: number;
  currency: string;
  stripe_subscription_id: string | null;
  created_at: string;
}

function unauthorized(): Response {
  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="PrintOne Admin"' },
  });
}

function checkAuth(request: Request, env: Env): boolean {
  if (!env.ADMIN_PASSWORD) return false;

  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice("Basic ".length));
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;
  const password = decoded.slice(separatorIndex + 1);

  return password === env.ADMIN_PASSWORD;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPage(rows: SubscriberRow[]): string {
  const tableRows = rows
    .map(
      (row) => `<tr>
        <td>${escapeHtml(row.created_at)}</td>
        <td>${escapeHtml(row.name || "-")}</td>
        <td>${escapeHtml(row.email || "-")}</td>
        <td>${escapeHtml(row.plan_name || "-")}</td>
        <td>${row.currency.toUpperCase()} ${(row.amount_total / 100).toFixed(2)}</td>
        <td>${escapeHtml(row.stripe_subscription_id || "-")}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>PrintOne Admin - Subscribers</title>
  <style>
    body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; padding: 2rem; background: #f3f6fb; color: #051e47; }
    h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
    p.meta { color: #4b5a72; margin-top: 0; margin-bottom: 1.5rem; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    th, td { text-align: left; padding: 0.65rem 0.85rem; border-bottom: 1px solid #e4e9f2; font-size: 0.9rem; }
    th { background: #0e47ac; color: #fff; font-weight: 600; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #eaf1fb; }
    .empty { padding: 2rem; text-align: center; color: #4b5a72; background: #fff; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>PrintOne Subscribers</h1>
  <p class="meta">${rows.length} subscriber${rows.length === 1 ? "" : "s"} (most recent 200)</p>
  ${
    rows.length === 0
      ? `<div class="empty">No subscribers yet.</div>`
      : `<table>
          <thead>
            <tr><th>Date</th><th>Name</th><th>Email</th><th>Plan</th><th>Amount</th><th>Stripe Subscription</th></tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>`
  }
</body>
</html>`;
}

export async function handleAdmin(request: Request, env: Env): Promise<Response> {
  if (!checkAuth(request, env)) {
    return unauthorized();
  }

  const { results } = await env.DB.prepare(
    "SELECT id, email, name, plan_name, amount_total, currency, stripe_subscription_id, created_at FROM subscribers ORDER BY created_at DESC LIMIT 200",
  ).all<SubscriberRow>();

  return new Response(renderPage(results), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
