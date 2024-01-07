import type { Database } from "./generated.types";

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type Recipe = Tables<"recipes"> & {
	categories: Tables<"categories">[];
	images: Tables<"images">[];
	ingredients: Tables<"ingredients">[];
	steps: Tables<"steps">[];
	types: Tables<"types">[];
};

// Used for numeric values that map to a string, like categories, types, cost or difficulty
export type DisplayValue = {
	id: number;
	name: string;
};
