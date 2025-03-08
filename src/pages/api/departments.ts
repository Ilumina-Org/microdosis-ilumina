import type { APIRoute } from "astro";
import { DEPARTMENTS } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(DEPARTMENTS), {
    headers: { "Content-Type": "application/json" },
  });
};
