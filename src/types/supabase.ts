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
      shows: {
        Row: {
          backup_name: string | null
          brand_id: string | null
          created_at: string | null
          duration_seconds: string | null
          image_url: string | null
          name: string | null
          release_timestamp: string | null
          show_id: string
          updated_at: string | null
        }
        Insert: {
          backup_name?: string | null
          brand_id?: string | null
          created_at?: string | null
          duration_seconds?: string | null
          image_url?: string | null
          name?: string | null
          release_timestamp?: string | null
          show_id: string
          updated_at?: string | null
        }
        Update: {
          backup_name?: string | null
          brand_id?: string | null
          created_at?: string | null
          duration_seconds?: string | null
          image_url?: string | null
          name?: string | null
          release_timestamp?: string | null
          show_id?: string
          updated_at?: string | null
        }
      }
      songs: {
        Row: {
          apple_id: string | null
          apple_url: string | null
          artist: string | null
          backup_name: string | null
          created_at: string | null
          generated_id: string
          is_searched: boolean | null
          name: string | null
          show_id: string | null
          spotify_id: string | null
          spotify_name: string | null
          spotify_url: string | null
          updated_at: string | null
        }
        Insert: {
          apple_id?: string | null
          apple_url?: string | null
          artist?: string | null
          backup_name?: string | null
          created_at?: string | null
          generated_id: string
          is_searched?: boolean | null
          name?: string | null
          show_id?: string | null
          spotify_id?: string | null
          spotify_name?: string | null
          spotify_url?: string | null
          updated_at?: string | null
        }
        Update: {
          apple_id?: string | null
          apple_url?: string | null
          artist?: string | null
          backup_name?: string | null
          created_at?: string | null
          generated_id?: string
          is_searched?: boolean | null
          name?: string | null
          show_id?: string | null
          spotify_id?: string | null
          spotify_name?: string | null
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
