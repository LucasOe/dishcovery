import type { Tables } from "./generated.types";

export type Recipe = Tables<"recipes"> & {
	categories: Tables<"categories">[];
	images: Tables<"images">[];
	ingredients: Tables<"ingredients">[];
	steps: Tables<"steps">[];
	types: Tables<"types">[];
};
