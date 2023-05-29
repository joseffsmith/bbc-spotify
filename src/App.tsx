import { Box, Typography } from "@mui/joy";
import { Outlet, useNavigate } from "react-router-dom";
import { addingShowToPlaylistAtom, sessionAtom } from "./atoms";
import { useRecoilValue } from "recoil";
import { UserProfile } from "./UserProfile";
import { ShowSearch } from "./ShowSearch";
import PlaylistModal from "./PlaylistModal";

export const App = () => {
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
            p: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ShowSearch />
          <Outlet />
        </Box>
      ) : null}
      {addingShowId && <PlaylistModal showId={addingShowId} />}
    </Box>
  );
};
