import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

export const sessionAtom = atom<Session | null>({
    key: "sessionAtom",
    default: null
})

export const brandIdAtom = atom<string>({
    key: "brandIdAtom",
    default: "b01dmw9x"
})

export const showsAtom = atom<any>({
    key: "showsAtom",
    default: []
})