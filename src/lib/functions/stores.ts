import { writable } from "svelte/store";

import { fetchRecipe } from "$lib/functions/db";
import { Direction } from "$types/card.types";
import type {Recipe, User} from "$types/database.types";

const initRecipe = await fetchRecipe(1);

export const selectedRecipe = writable<Recipe>(initRecipe);
export const swipeDirection = writable(Direction.None);
export const currentUser = writable<User | null>(null)
