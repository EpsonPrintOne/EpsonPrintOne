import { handleEnquiry } from "./enquiry";
import { handleStripeWebhook } from "./stripe";
import { handleAdmin } from "./admin";
import type { Env } from "./env";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleEnquiry(request, env);
    }

    if (url.pathname === "/api/stripe-webhook") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleStripeWebhook(request, env);
    }

    if (url.pathname === "/admin" || url.pathname === "/admin/") {
      return handleAdmin(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
