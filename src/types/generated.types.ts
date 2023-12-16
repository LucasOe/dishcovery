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
      ingredients: {
        Row: {
          amount: string | null
          id: number
          ingredient: string
          recipe_id: number
        }
        Insert: {
          amount?: string | null
          id?: number
          ingredient: string
          recipe_id: number
        }
        Update: {
          amount?: string | null
          id?: number
          ingredient?: string
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          cost: number
          created_at: string
          description: string | null
          difficulty: number
          id: number
          name: string
          preperation_time: number
        }
        Insert: {
          cost: number
          created_at?: string
          description?: string | null
          difficulty: number
          id?: number
          name: string
          preperation_time: number
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string | null
          difficulty?: number
          id?: number
          name?: string
          preperation_time?: number
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
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_categories_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_types_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          }
        ]
      }
      steps: {
        Row: {
          description: string
          id: number
          number: number
          recipe_id: number
        }
        Insert: {
          description: string
          id?: number
          number: number
          recipe_id: number
        }
        Update: {
          description?: string
          id?: number
          number?: number
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "steps_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
