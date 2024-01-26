import { supabase } from "$lib/functions/database/createClient";
import type { Ingredient, Recipe, Tables } from "$types/database.types";

export const fetchRecipes = async (ids: number[]): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.in("id", [ids]);
	if (error) throw error;
	else return data;
};

export const fetchRecipesNotSeen = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*), ratings(recipe)`)
		.eq("ratings.user_id", userID)
		.is("ratings", null) // recipe hasn't been rated by user
		.order("id")
		.limit(3);
	if (error) throw error;
	else return data;
};

export const fetchRecipe = async (id: number): Promise<Recipe | null> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.eq("id", id)
		.maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchNextRecipe = async (currentId: number): Promise<Recipe | null> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.gt("id", currentId)
		.order("id")
		.limit(1)
		.maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchNextRecipeNotSeen = async (currentId: number, userID: string): Promise<Recipe | null> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*), ratings(recipe)`)
		.eq("ratings.user_id", userID)
		.is("ratings", null) // recipe hasn't been rated by user
		.gt("id", currentId)
		.order("id")
		.limit(1)
		.maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchRecipesInCookBook = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("ratings")
		.select(`recipes ( *, categories(*), images(*), ingredients(*), steps(*), types(*) )`)
		.eq("user_id", userID)
		.eq("inCookBook", true);
	if (error) throw error;

	const recipes: Recipe[] = [];
	for (const obj of data) {
		recipes.push(obj.recipes as Recipe);
	}

	return recipes;
};

export const fetchTypes = async (): Promise<Tables<"types">[]> => {
	const { data, error } = await supabase.from("types").select(`*`);
	if (error) throw error;
	else return data;
};

export const fetchCategories = async (): Promise<Tables<"categories">[]> => {
	const { data, error } = await supabase.from("categories").select(`*`);
	if (error) throw error;
	else return data;
};

export const uploadRecipeImages = async (id: number, files: Blob[]): Promise<string[]> => {
	const paths: string[] = [];
	for (let index = 0; index < files.length; index++) {
		const { data: path, error } = await supabase.storage
			.from("images")
			.upload(`recipe${id}-${index}.jpg`, files[index], {
				cacheControl: "3600",
				upsert: false,
			});
		if (error) throw error;

		const { data: publicUrl } = await supabase.storage.from("images").getPublicUrl(path.path);
		paths.push(publicUrl.publicUrl);
	}
	return paths;
};

export const insertRecipe = async (recipe: {
	cost: number;
	description: string;
	difficulty: number;
	name: string;
	preperation_time: number;
	user_id: string;
}): Promise<number> => {
	const { data, error } = await supabase
		.from("recipes")
		.insert({
			name: recipe.name,
			description: recipe.description,
			difficulty: recipe.difficulty,
			cost: recipe.cost,
			preperation_time: recipe.preperation_time,
			user_id: recipe.user_id,
		})
		.select()
		.single();
	if (data) return data.id;
	else throw error;
};

export const insertRecipeCategories = async (id: number, categories: number[]) => {
	const { error } = await supabase.from("recipes_categories").insert(
		categories.map((category) => ({
			recipe_id: id,
			category_id: category,
		}))
	);
	if (error) throw error;
};

export const insertRecipeTypes = async (id: number, types: number[]) => {
	const { error } = await supabase.from("recipes_types").insert(
		types.map((type) => ({
			recipe_id: id,
			type_id: type,
		}))
	);
	if (error) throw error;
};

export const insertRecipeImages = async (id: number, images: string[]) => {
	const { error } = await supabase.from("images").insert(
		images.map((image) => ({
			recipe_id: id,
			image: image,
		}))
	);
	if (error) throw error;
};

export const insertRecipeSteps = async (id: number, steps: string[]) => {
	const { error } = await supabase.from("steps").insert(
		steps.map((step, index) => ({
			recipe_id: id,
			number: index + 1,
			description: step,
		}))
	);
	if (error) throw error;
};

export const insertRecipeIngredients = async (id: number, ingredients: Ingredient[]) => {
	const { error } = await supabase.from("ingredients").insert(
		ingredients.map((ingredient) => ({
			recipe_id: id,
			name: ingredient.name,
			amount: ingredient.amount,
		}))
	);
	if (error) throw error;
};

export const deleteRecipe = async (id: number) => {
	const { error } = await supabase.from("recipes").delete().eq("id", id);
	if (error) throw error;
};
