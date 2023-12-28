// stores.ts
import { writable } from "svelte/store";
import type { Recipe } from "$types/database.types";

export const selectedRecipe = writable<Recipe | null>(null);
