import { Session } from "@supabase/supabase-js";
import { atom, atomFamily } from "recoil";
import { Database } from "./types/supabase";

export const sessionAtom = atom<Session | null>({
  key: "sessionAtom",
  default: null,
});

export const brandIdAtom = atom<string>({
  key: "brandIdAtom",
  default: "b01dmw9x",
});

export const showsAtomFamily = atomFamily<
  Database["public"]["Tables"]["shows"]["Row"][],
  string
>({
  key: "showsAtom",
  default: (brand_id: string) => [],
});

export const songsAtomFamily = atomFamily<
  Database["public"]["Tables"]["songs"]["Row"][],
  string
>({
  key: "songsAtom",
  default: (show_id: string) => [],
});

export const addingShowToPlaylistAtom = atom({
  key: "addingShowToPlaylistAtom",
  default: null,
});
