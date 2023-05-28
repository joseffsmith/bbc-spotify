import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Sheet,
  TextField,
  Typography,
} from "@mui/joy";
import axios from "axios";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { brandIdAtom, sessionAtom, showsAtom } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserProfile } from "./UserProfile";
import { supabaseClient } from "./SupabaseClient";
import { useTheme } from "@emotion/react";

export const App = () => {
  const theme = useTheme();
  const session = useRecoilValue(sessionAtom);
  const nav = useNavigate();
  console.log(theme);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"stretch"}
      rowGap={1}
      width="100%"
    >
      <Box
        sx={{
          backgroundColor: "neutral.50",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            maxWidth: 1250,
            m: "0 auto",
          }}
        >
          <Typography
            onClick={() => nav("/")}
            sx={{ cursor: "pointer" }}
            level="h5"
            color="primary"
          >
            BBC Scraper
          </Typography>
          <UserProfile />
        </Box>
      </Box>

      {session ? (
        <Box
          sx={{
            maxWidth: 1000,
            m: "0 auto",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ShowSearch />
          <Outlet />
        </Box>
      ) : (
        <Box
          width="100%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <UserProfile />
        </Box>
      )}
    </Box>
  );
};

const ShowSearch = () => {
  const [brandId, setBrandId] = useRecoilState(brandIdAtom);
  const [shows, setShows] = useRecoilState(showsAtom);

  function subscribeToBrand(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          maxWidth: 600,
          flexGrow: 1,
          columnGap: 1,
        }}
      >
        <Input
          fullWidth
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          placeholder="e.g. b01dmw9x of https://www.bbc.co.uk/sounds/brand/b01dmw9x"
        />

        <Link to={"/" + brandId}>
          <Button variant={"solid"} disabled={!brandId}>
            Load
          </Button>
        </Link>
        <Button
          variant="outlined"
          disabled={!brandId}
          onClick={() => subscribeToBrand()}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

const Playlists = () => {
  const playlists = useSpotify("playlists");

  console.log(playlists);
  return (
    <List>
      <ListItem></ListItem>
    </List>
  );
};

const useSpotify = (url: string, params?: any) => {
  const session = useRecoilValue(sessionAtom);
  const [d, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!session) {
      return;
    }
    console.log(session);
    const a = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${session?.provider_token}`,
        },
        params: {
          limit: 50,
        },
      };
      const { data } = await axios.get(
        `https://api.spotify.com/v1/users/${
          session?.user.identities![0].id
        }/${url}`,
        config
      );
      setData(data);
    };
    a();
  }, [session]);

  return d;
};
