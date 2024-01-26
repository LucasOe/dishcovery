import { writable } from "svelte/store";

import { Direction } from "$types/card.types";
import type { Recipe, User } from "$types/database.types";
import type { Filter } from "$types/filter.types";

export const recipe = writable<Recipe | null>(null);
export const swipeDirection = writable(Direction.None);
export const user = writable<User | null>(null);
export const filters = writable<Filter>();
