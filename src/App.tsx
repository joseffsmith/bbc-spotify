import { useEffect, useState } from "react";
import { Box, Button, Input, List, ListItem, Typography } from "@mui/joy";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { addingShowToPlaylistAtom, brandIdAtom, sessionAtom } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserProfile } from "./UserProfile";
import { useTheme } from "@emotion/react";
import { ShowSearch } from "./ShowSearch";
import PlaylistModal from "./PlaylistModal";

export const App = () => {
  const theme = useTheme();
  const session = useRecoilValue(sessionAtom);
  const nav = useNavigate();

  const addingShowId = useRecoilValue(addingShowToPlaylistAtom);
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
      {addingShowId && <PlaylistModal />}
    </Box>
  );
};
