import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import axios from "https://esm.sh/axios";
import { Buffer } from "https://esm.sh/buffer";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// TODO: store variables in environment

serve(async (req: { method: string; json: () => any }) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const all = await req.json();
  const { code } = all;
  console.log(code);
  const client_id = "ffec3c232eea433d97baee40aa93a260";
  const client_secret = "abad3e420de241edbb93a6cb0071fa0c";

  const fd = new URLSearchParams();
  fd.append("code", code);
  fd.append("redirect_uri", "http://localhost:5173/callback");
  fd.append("grant_type", "authorization_code");

  const { data: tokenData } = await axios.post(
    "https://accounts.spotify.com/api/token",
    fd,
    {
      headers: {
        "Authorization": "Basic " +
          (new Buffer.from(`${client_id}:${client_secret}`).toString("base64")),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const {
    access_token,
    refresh_token,
  } = tokenData;

  const { data: profileData } = await axios.get(
    "https://api.spotify.com/v1/me",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  console.log({
    access_token,
    refresh_token,
    profileData,
  });

  return new Response(
    JSON.stringify({ access_token, ...profileData }),
    { headers: { "Content-Type": "application/json", ...corsHeaders } },
  );
});
