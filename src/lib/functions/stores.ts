import { writable } from "svelte/store";

import { Direction } from "$types/card.types";
import type { Recipe, User } from "$types/database.types";

export const recipe = writable<Recipe | null>(null);
export const swipeDirection = writable(Direction.None);
export const user = writable<User | null>(null);
