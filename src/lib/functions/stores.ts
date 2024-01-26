import { writable } from "svelte/store";

import { fetchRecipe } from "$lib/functions/database/recipes";
import { Direction } from "$types/card.types";
import type { Recipe, User } from "$types/database.types";

export const recipe = writable<Recipe>(await fetchRecipe(1));
export const swipeDirection = writable(Direction.None);
export const user = writable<User | null>(null);
