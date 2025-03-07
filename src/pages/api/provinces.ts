import type { APIRoute } from "astro";
import { PROVINCES } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(PROVINCES), {
    headers: { "Content-Type": "application/json" },
  });
};
