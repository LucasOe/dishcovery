export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			categories: {
				Row: {
					category: string | null;
					created_at: string;
					id: number;
				};
				Insert: {
					category?: string | null;
					created_at?: string;
					id?: number;
				};
				Update: {
					category?: string | null;
					created_at?: string;
					id?: number;
				};
				Relationships: [];
			};
			recipes: {
				Row: {
					created_at: string;
					description: string | null;
					difficulty: Database["public"]["Enums"]["difficulty"] | null;
					duration: Database["public"]["Enums"]["duration"] | null;
					id: number;
					ingredients: string | null;
					name: string | null;
					price: Database["public"]["Enums"]["price"] | null;
					steps: string | null;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					difficulty?: Database["public"]["Enums"]["difficulty"] | null;
					duration?: Database["public"]["Enums"]["duration"] | null;
					id?: number;
					ingredients?: string | null;
					name?: string | null;
					price?: Database["public"]["Enums"]["price"] | null;
					steps?: string | null;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					difficulty?: Database["public"]["Enums"]["difficulty"] | null;
					duration?: Database["public"]["Enums"]["duration"] | null;
					id?: number;
					ingredients?: string | null;
					name?: string | null;
					price?: Database["public"]["Enums"]["price"] | null;
					steps?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			difficulty: "einfach" | "fortgeschritten" | "schwer";
			duration: "< 5" | "5" | "10" | "15" | "20" | "30" | "45" | "60" | "90" | "180" | "240" | "240 <";
			price: "€" | "€€" | "€€€";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
