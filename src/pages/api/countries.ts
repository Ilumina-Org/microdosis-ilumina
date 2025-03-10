import type { APIRoute } from "astro";
import { COUNTRIES } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(COUNTRIES), {
    headers: { "Content-Type": "application/json" },
  });
};
