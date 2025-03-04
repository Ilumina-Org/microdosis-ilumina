import type { APIRoute } from "astro";
import { DISTRICTS } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(DISTRICTS), {
    headers: { "Content-Type": "application/json" },
  });
};
