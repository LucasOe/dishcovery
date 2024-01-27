import type { Database } from "./generated.types";

type Base<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T];

export type RowTables<T extends keyof Database["public"]["Tables"]> = Base<T>["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Base<T>["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> = Base<T>["Update"];

export type Image = RowTables<"images">;
export type InsertImage = InsertTables<"images">;
export type UpdateImage = UpdateTables<"images">;

export type Ingredient = RowTables<"ingredients">;
export type InsertIngredient = InsertTables<"ingredients">;
export type UpdateIngredient = UpdateTables<"ingredients">;

export type User = RowTables<"profiles">;
export type InsertUser = InsertTables<"profiles">;
export type UpdateUser = UpdateTables<"profiles">;

export type Rating = RowTables<"ratings">;
export type InsertRating = InsertTables<"ratings">;
export type UpdateRating = UpdateTables<"ratings">;

export type Recipe = RowTables<"recipes"> & {
	categories: RowTables<"categories">[];
	images: RowTables<"images">[];
	ingredients: RowTables<"ingredients">[];
	steps: RowTables<"steps">[];
	types: RowTables<"types">[];
};
export type InsertRecipe = InsertTables<"recipes">;
export type UpdateRecipe = UpdateTables<"recipes">;

export type Category = RowTables<"categories">;
export type InsertCategory = InsertTables<"categories">;
export type UpdateCategory = UpdateTables<"categories">;

export type Type = RowTables<"types">;
export type InsertType = InsertTables<"types">;
export type UpdateType = UpdateTables<"types">;

export type RecipeCategory = RowTables<"recipes_categories">;
export type InsertRecipeCategory = InsertTables<"recipes_categories">;
export type UpdateRecipeCategory = UpdateTables<"recipes_categories">;

export type RecipeType = RowTables<"recipes_types">;
export type InsertRecipeType = InsertTables<"recipes_types">;
export type UpdateRecipeType = UpdateTables<"recipes_types">;

export type Step = RowTables<"steps">;
export type InsertStep = InsertTables<"steps">;
export type UpdateStep = UpdateTables<"steps">;
