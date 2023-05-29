import { Box, CircularProgress, LinearProgress, Typography } from "@mui/joy";
import { Outlet, useNavigate } from "react-router-dom";
import {
  addingShowToPlaylistAtom,
  brandIdAtom,
  isLoadingShowsAtom,
  sessionAtom,
  showsAtom,
} from "./atoms";
import { useRecoilValue } from "recoil";
import { UserProfile } from "./UserProfile";
import { ShowSearch } from "./ShowSearch";
import PlaylistModal from "./PlaylistModal";
import { Shows } from "./Shows";

export const App = () => {
  const session = useRecoilValue(sessionAtom);
  const nav = useNavigate();

  const addingShowId = useRecoilValue(addingShowToPlaylistAtom);
  const brandId = useRecoilValue(brandIdAtom);
  const shows = useRecoilValue(showsAtom);
  const isLoadingShows = useRecoilValue(isLoadingShowsAtom);
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
          {isLoadingShows && (
            <Box
              sx={{
                pt: "25dvh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {brandId && shows && <Shows brandId={brandId} />}
        </Box>
      ) : null}
      {addingShowId && <PlaylistModal showId={addingShowId} />}
    </Box>
  );
};
