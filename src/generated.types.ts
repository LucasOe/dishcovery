export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          created_at: string
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          duration: Database["public"]["Enums"]["duration"] | null
          id: number
          ingredients: string | null
          name: string | null
          price: Database["public"]["Enums"]["price"] | null
          steps: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          duration?: Database["public"]["Enums"]["duration"] | null
          id?: number
          ingredients?: string | null
          name?: string | null
          price?: Database["public"]["Enums"]["price"] | null
          steps?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          duration?: Database["public"]["Enums"]["duration"] | null
          id?: number
          ingredients?: string | null
          name?: string | null
          price?: Database["public"]["Enums"]["price"] | null
          steps?: string | null
        }
        Relationships: []
      }
      recipes_categories: {
        Row: {
          category_id: number
          id: number
          recipe_id: number
        }
        Insert: {
          category_id: number
          id?: number
          recipe_id: number
        }
        Update: {
          category_id?: number
          id?: number
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipes_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_categories_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes_types: {
        Row: {
          id: number
          recipe_id: number
          type_id: number
        }
        Insert: {
          id?: number
          recipe_id: number
          type_id: number
        }
        Update: {
          id?: number
          recipe_id?: number
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipes_types_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_types_type_id_fkey"
            columns: ["type_id"]
            referencedRelation: "types"
            referencedColumns: ["id"]
          }
        ]
      }
      types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty: "einfach" | "fortgeschritten" | "schwer"
      duration:
        | "< 5"
        | "5"
        | "10"
        | "15"
        | "20"
        | "30"
        | "45"
        | "60"
        | "90"
        | "180"
        | "240"
        | "240 <"
      price: "€" | "€€" | "€€€"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
