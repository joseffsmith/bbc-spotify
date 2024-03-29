import {
  Box,
  Button,
  Table,
  Typography,
  useTheme,
  LinearProgress,
  Avatar,
} from "@mui/joy";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { addingShowToPlaylistAtom } from "./atoms";
import { useRecoilState } from "recoil";
import spotifyLogo from "./assets/spotify.svg";

export const Show = ({ show }: { show: any }) => {
  const [showIdAdding, setShowIdAdding] = useRecoilState(
    addingShowToPlaylistAtom
  );
  const [open, setOpen] = useState(false);
  const songs = show.songs;
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOpen = async () => {
    setOpen((p) => {
      return !p;
    });
  };

  const handleAdd = async () => {
    setShowIdAdding(show.show_id);
  };

  return (
    <>
      <tr style={{ cursor: "pointer" }} key={show.show_id} onClick={handleOpen}>
        {mq && (
          <td>
            <img width={80} src={show.image_url} />
          </td>
        )}

        <td style={{ overflow: "hidden" }}>
          <Typography overflow={"hidden"} textOverflow={"ellipsis"}>
            {show.name}
          </Typography>
          <Typography
            level="body3"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {show.backup_name}
          </Typography>
          <Typography level="body2">
            {new Date(show.release_timestamp).toLocaleString("en-GB", {
              dateStyle: "short",
            })}
          </Typography>
        </td>
        <td style={{ textAlign: "right" }}>
          <Button size="sm" variant="plain">
            {open ? "Hide " : "View "} songs
          </Button>
          <Button
            size="sm"
            variant="soft"
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
          >
            Add to playlist
          </Button>
        </td>
      </tr>
      {open && (
        <>
          <tr style={{ height: 5, border: "none", padding: 0, margin: 0 }}>
            <td colSpan={6} style={{ height: 5, padding: 0, border: "none" }}>
              <Box height={5}>{loading && <LinearProgress />}</Box>
            </td>
          </tr>
          <tr style={{ background: "none " }}>
            <td
              style={{
                paddingBottom: 0,
                paddingTop: 0,
              }}
              colSpan={6}
            >
              <Table aria-label="purchases">
                <colgroup>
                  <col width="30%"></col>
                  <col width="70%"></col>
                  <col width="50px"></col>
                </colgroup>
                <tbody>
                  {songs.map((s: any) => {
                    return (
                      <tr style={{ background: "none" }} key={s.generated_id}>
                        <td>{s.artist}</td>
                        <td>
                          {s.name}
                          <Typography level="body3">{s.backup_name}</Typography>
                        </td>

                        <td>
                          {s.spotify_url && (
                            <a href={s.spotify_url} target="_blank">
                              <Avatar size="sm" src={spotifyLogo} />
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </td>
          </tr>
        </>
      )}
    </>
  );
};
