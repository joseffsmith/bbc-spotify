import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import { addingShowToPlaylistAtom, showsAtom } from "./atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { supabaseClient } from "./SupabaseClient";
import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { Check } from "@mui/icons-material";

export default function PlaylistModal({ showId }: { showId: string }) {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [adding, setAdding] = useState(false);
  const [creating, setCreating] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showIdAdding, setShowIdAdding] = useRecoilState(
    addingShowToPlaylistAtom
  );

  const shows = useRecoilValue(showsAtom);
  const songs = shows?.[showId] ?? [];
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  useEffect(() => {
    getSpotifyPlaylists().then((data) => {
      setPlaylists(data);
      setLoading(false);
    });
  }, []);

  const handleCreatePlaylist = async () => {
    if (creating) {
      return;
    }
    setCreating(true);
    if (!newPlaylistName) {
      return;
    }
    const newPlaylist = newPlaylistName.trim();
    if (playlists.find((p) => p.name.trim() === newPlaylist)) {
      alert("Playlist name already exists");
      return;
    }
    setLoading(true);
    await createSpotifyPlaylist(newPlaylistName);
    const plays = await getSpotifyPlaylists();
    setPlaylists(plays);
    setLoading(false);
    setCreating(false);
  };

  const handleAddToPlaylist = async () => {
    if (adding) {
      return;
    }
    setAdding(true);
    if (!selectedPlaylist) {
      return;
    }

    const with_id = songs
      .filter((s: any) => s.spotify_id !== null)
      .map((s: any) => s.spotify_id) as string[];

    await addSongsToPlaylist(selectedPlaylist, with_id);
    setAdding(false);
    setShowIdAdding(null);
  };

  return (
    <Modal open onClose={() => setShowIdAdding(null)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          width: 400,
        }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Add to playlist
        </Typography>
        <Typography
          id="basic-modal-dialog-description"
          textColor="text.tertiary"
        >
          Add show to spotify playlist
        </Typography>
        {/* <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setShowIdAdding(null);
          }}
        > */}
        <FormControl>
          <FormLabel>Create playlist</FormLabel>
          <Input
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            endDecorator={
              <Button variant="soft" onClick={handleCreatePlaylist}>
                Create
              </Button>
            }
          />
        </FormControl>
        <Box height={5}>{loading && <LinearProgress />}</Box>

        <List sx={{ overflowY: "auto", height: 300 }}>
          {playlists.map((p) => {
            return (
              <ListItem
                sx={{
                  alignItems: "baseline",
                  backgroundColor:
                    selectedPlaylist === p.id ? "primary.100" : null,
                }}
                endAction={
                  <Chip
                    size="lg"
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    variant="plain"
                  >
                    {selectedPlaylist === p.id ? <Check /> : null}
                  </Chip>
                }
                key={p.id}
              >
                <ListItemButton
                  sx={{ gap: 1 }}
                  onClick={() =>
                    selectedPlaylist === p.id
                      ? setSelectedPlaylist(null)
                      : setSelectedPlaylist(p.id)
                  }
                >
                  <ListItemDecorator>
                    <Avatar src={p.images.length ? p.images[0].url : ""} />
                  </ListItemDecorator>
                  <ListItemContent>{p.name}</ListItemContent>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* </form> */}
        <Box sx={{ gap: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setShowIdAdding(null)} variant="plain">
            Cancel
          </Button>
          <Button disabled={!selectedPlaylist} onClick={handleAddToPlaylist}>
            Add
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

const addSongsToPlaylist = async (playlistId: string, songIds: string[]) => {
  const spotifyAuth = await getSpotifyAuth();

  const { data } = await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      position: 0,
      uris: songIds.map((sId) => "spotify:track:" + sId),
    },
    {
      headers: { ...spotifyAuth },
    }
  );
  return data;
};

const createSpotifyPlaylist = async (name: string) => {
  const spotifyAuth = await getSpotifyAuth();
  const spotifyId = await getSpotifyUserId();

  const { data } = await axios.post(
    `${SPOTIFY_BASE_URL}${spotifyId}/playlists`,
    {
      name,
      description: "Created using BBC scraper",
      public: false,
    },
    {
      headers: { ...spotifyAuth },
    }
  );
  return data;
};

// TODO: handle pagination
const getSpotifyPlaylists = async () => {
  const spotifyAuth = await getSpotifyAuth();
  const spotifyId = await getSpotifyUserId();

  const { data } = await axios.get(
    `${SPOTIFY_BASE_URL}${spotifyId}/playlists`,
    {
      headers: {
        ...spotifyAuth,
      },
      params: {
        limit: 50,
      },
    }
  );
  return data.items;
};

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/users/";

const getSpotifyUserId = async () => {
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  return user?.identities![0].id;
};

const getSpotifyAuth = async () => {
  const { data, error } = await supabaseClient.auth.getSession();

  let session = data.session;

  if (!session?.provider_token) {
    console.log("No provider token found, signing in again");
    await supabaseClient.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        scopes:
          "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public",
      },
    });
    const { data, error: e } = await supabaseClient.auth.getSession();

    session = data.session;
  }
  const token = session?.provider_token;
  return { Authorization: `Bearer ${token}` };
};
