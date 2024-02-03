import { writable } from "svelte/store";

import { browser } from "$app/environment";
import { Direction } from "$types/card.types";
import type { Recipe } from "$types/database.types";
import type { Filter } from "$types/filter.types";
import type { Tables } from "$types/generated.types";

const getFilters = (): Filter | undefined => {
	if (!browser) return;
	const filters = localStorage.getItem("filters");
	if (!filters) return;
	return JSON.parse(filters);
};

export const recipe = writable<Recipe | null>(null);
export const swipeDirection = writable(Direction.None);
export const user = writable<Tables<"profiles"> | null | undefined>();
export const filters = writable<Filter>(getFilters());
export const previousPage = writable<(string | undefined)[]>([]);

filters.subscribe((filters) => {
	if (!browser) return;
	if (!filters) return;
	localStorage.setItem("filters", JSON.stringify(filters));
});
