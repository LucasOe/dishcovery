// stores.ts
import { writable } from "svelte/store";
import type { Recipe } from "$types/database.types";
import { Direction } from "$types/card.types";
import { fetchRecipe } from "$lib/functions/db";

const initRecipe = await fetchRecipe(0);
export const selectedRecipe = writable<Recipe>(initRecipe);

export const swipeDirection = writable(Direction.None);
