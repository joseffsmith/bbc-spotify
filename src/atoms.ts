import { Session } from "@supabase/supabase-js";
import { atom, atomFamily } from "recoil";
import { Database } from "./types/supabase";

export const sessionAtom = atom<Session | null>({
  key: "sessionAtom",
  default: null,
});

export const spotifyAccessTokenAtom = atom<string | null>({
  key: "spotifyAccessTokenAtom",
  default: null,
});

export const brandIdAtom = atom<string>({
  key: "brandIdAtom",
  default: "b01dmw9x",
});

export const addingShowToPlaylistAtom = atom<string | null>({
  key: "addingShowToPlaylistAtom",
  default: null,
});

export const showsAtom = atom<{ [key: string]: any } | null>({
  key: "showsAtom",
  default: null,
});

export const isLoadingShowsAtom = atom({
  key: "isLoadingShowsAtom",
  default: false,
});
