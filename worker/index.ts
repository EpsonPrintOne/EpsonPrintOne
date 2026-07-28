import { handleEnquiry, type Env } from "./enquiry";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleEnquiry(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
