import { Chip, Avatar, Button } from "@mui/joy";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sessionAtom } from "./atoms";
import spotifyLogo from "./assets/spotify.svg";
import { supabaseClient } from "./SupabaseClient";

export function UserProfile() {
  const [signingIn, setSigningIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useRecoilState<Session | null>(sessionAtom);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session: sesh } }) => {
      setLoading(false);
      setSession(sesh);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const spotifyLogin = async () => {
    if (signingIn) {
      return;
    }
    setSigningIn(true);
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        scopes:
          "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public",
      },
    });
    console.log(data, error);
  };
  console.log(session);

  return (
    <>
      {session ? (
        <Chip
          variant="soft"
          startDecorator={<Avatar src={spotifyLogo} />}
          onClick={() => null}
        >
          {session.user.identities![0].identity_data!.name}
        </Chip>
      ) : (
        <Button
          variant="soft"
          onClick={spotifyLogin}
          disabled={loading || signingIn}
        >
          {signingIn ? "Signing in..." : "Sign in with Spotify"}
        </Button>
      )}
    </>
  );
}