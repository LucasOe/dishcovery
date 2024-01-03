// stores.ts
import { writable } from "svelte/store";
import type { Recipe } from "$types/database.types";
import {Direction} from "$types/card.types";

export const selectedRecipe = writable<Recipe>();

export const swipeDirection = writable(Direction.None);
