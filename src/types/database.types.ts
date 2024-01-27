import type { Tables, TablesInsert, TablesUpdate } from "./generated.types";

export type Image = Tables<"images">;
export type InsertImage = TablesInsert<"images">;
export type UpdateImage = TablesUpdate<"images">;

export type Ingredient = Tables<"ingredients">;
export type InsertIngredient = TablesInsert<"ingredients">;
export type UpdateIngredient = TablesUpdate<"ingredients">;

export type User = Tables<"profiles">;
export type InsertUser = TablesInsert<"profiles">;
export type UpdateUser = TablesUpdate<"profiles">;

export type Rating = Tables<"ratings">;
export type InsertRating = TablesInsert<"ratings">;
export type UpdateRating = TablesUpdate<"ratings">;

export type Recipe = Tables<"recipes"> & {
	categories: Tables<"categories">[];
	images: Tables<"images">[];
	ingredients: Tables<"ingredients">[];
	steps: Tables<"steps">[];
	types: Tables<"types">[];
};
export type InsertRecipe = TablesInsert<"recipes">;
export type UpdateRecipe = TablesUpdate<"recipes">;

export type Category = Tables<"categories">;
export type InsertCategory = TablesInsert<"categories">;
export type UpdateCategory = TablesUpdate<"categories">;

export type Type = Tables<"types">;
export type InsertType = TablesInsert<"types">;
export type UpdateType = TablesUpdate<"types">;

export type RecipeCategory = Tables<"recipes_categories">;
export type InsertRecipeCategory = TablesInsert<"recipes_categories">;
export type UpdateRecipeCategory = TablesUpdate<"recipes_categories">;

export type RecipeType = Tables<"recipes_types">;
export type InsertRecipeType = TablesInsert<"recipes_types">;
export type UpdateRecipeType = TablesUpdate<"recipes_types">;

export type Step = Tables<"steps">;
export type InsertStep = TablesInsert<"steps">;
export type UpdateStep = TablesUpdate<"steps">;
