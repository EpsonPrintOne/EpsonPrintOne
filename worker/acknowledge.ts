import type { Env } from "./env";
import { plans } from "../src/data/plans";

interface AcknowledgePayload {
  plan_slug?: unknown;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function handleAcknowledge(request: Request, env: Env): Promise<Response> {
  let payload: AcknowledgePayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const planSlug = asString(payload.plan_slug);
  const plan = plans.find((p) => p.slug === planSlug);
  if (!plan) {
    return Response.json({ error: "Unknown plan." }, { status: 400 });
  }

  const token = crypto.randomUUID();

  try {
    await env.DB.prepare(
      `INSERT INTO plan_acknowledgments (token, plan_slug) VALUES (?, ?)`,
    )
      .bind(token, planSlug)
      .run();
  } catch (err) {
    console.error("acknowledge: failed to record acknowledgment", err);
    return Response.json({ error: "Could not record acknowledgment." }, { status: 500 });
  }

  return Response.json({ token });
}
