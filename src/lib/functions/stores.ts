import { writable } from "svelte/store";

import { Direction } from "$types/card.types";
import type { Recipe } from "$types/database.types";
import type { Filter } from "$types/filter.types";
import type { Tables } from "$types/generated.types";

export const recipe = writable<Recipe | null>(null);
export const swipeDirection = writable(Direction.None);
export const user = writable<Tables<"profiles"> | null>(null);
export const filters = writable<Filter>();
