export interface AssetsFetcher {
  fetch(request: Request): Promise<Response>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{
    success: boolean;
    meta: { last_row_id: number; changes: number };
  }>;
  all<T = unknown>(): Promise<{ results: T[]; success: boolean }>;
  first<T = unknown>(): Promise<T | null>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface Env {
  ASSETS: AssetsFetcher;
  DB: D1Database;
  RESEND_API_KEY?: string;
  ENQUIRY_NOTIFICATION_EMAIL?: string;
  ENQUIRY_FROM_EMAIL?: string;
  SUBSCRIBER_NOTIFICATION_EMAIL?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  /** Restricted key, read-only on Checkout Sessions — used only to resolve
   * which SKU was purchased in a one-time (non-subscription) order, since
   * several ink SKUs share an identical price and can't be told apart by
   * amount alone. */
  STRIPE_SECRET_KEY?: string;
  ADMIN_PASSWORD?: string;
}
