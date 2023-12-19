import type { Database } from "./generated.types";

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type Recipe = Tables<"recipes"> & {
	categories: Tables<"categories">[];
	types: Tables<"types">[];
};