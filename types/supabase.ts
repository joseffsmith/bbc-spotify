export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      songs: {
        Row: {
          apple_id: string | null
          apple_url: string | null
          artist: string | null
          backup_name: string | null
          bbc_id: string | null
          created_at: string | null
          id: number
          name: string | null
          show_id: string | null
          spotify_id: string | null
          spotify_url: string | null
          updated_at: string | null
        }
        Insert: {
          apple_id?: string | null
          apple_url?: string | null
          artist?: string | null
          backup_name?: string | null
          bbc_id?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          show_id?: string | null
          spotify_id?: string | null
          spotify_url?: string | null
          updated_at?: string | null
        }
        Update: {
          apple_id?: string | null
          apple_url?: string | null
          artist?: string | null
          backup_name?: string | null
          bbc_id?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          show_id?: string | null
          spotify_id?: string | null
          spotify_url?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
