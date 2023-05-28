// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { main } from "./getShowList.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(
  async (
    req: { json: () => PromiseLike<{ brandId: string }> | { brandId: string } },
  ) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_ANON_KEY");
    console.log("headers: ", req.headers);
    const supabase = createClient(url, key, {
      global: { headers: { Authorization: req.headers.get("authorization")! } },
    });

    const { brandId } = await req.json();
    const shows = await main(brandId);
    const { data, error } = await supabase.from("shows").upsert(shows, {
      onConflict: "show_id",
    });
    const d = {
      message: error,
    };
    return new Response(
      JSON.stringify(d),
      { headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  },
);
