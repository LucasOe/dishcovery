import type { Recipe, Tables, User } from "$types/database.types";
import { supabase } from "./createClient";

export const fetchRecipes = async (ids: number[]): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.in("id", [ids]);
	if (data) return data;
	else throw error;
};

export const fetchRecipe = async (id: number): Promise<Recipe> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.eq("id", id)
		.maybeSingle();
	if (data) return data;
	else throw error;
};

export const fetchTypes = async (): Promise<Tables<"types">[]> => {
	const { data, error } = await supabase.from("types").select(`*`);
	if (data) return data;
	else throw error;
};

export const fetchCategories = async (): Promise<Tables<"categories">[]> => {
	const { data, error } = await supabase.from("categories").select(`*`);
	if (data) return data;
	else throw error;
};

export const fetchCurrentUser = async (): Promise<User> => {
	const { data, error } = await supabase.auth.refreshSession();
	const { session, user } = data;
	if (user) {
		return {
			id: user.id,
			username: user.user_metadata.username,
			email: user.email!,
			avatar_url: user.user_metadata.avatar_url,
		};
	} else throw error;
};

export const insertRecipe = async (recipe: {
	cost: number;
	description: string;
	difficulty: number;
	name: string;
	preperation_time: number;
	categories: number[];
}) => {
	// Insert into `recipes`
	const { data: recipe_data, error: recipe_error } = await supabase
		.from("recipes")
		.insert({
			name: recipe.name,
			description: recipe.description,
			difficulty: recipe.difficulty,
			cost: recipe.cost,
			preperation_time: recipe.preperation_time,
		})
		.select()
		.single();
	if (recipe_error) throw recipe_error;

	// Insert into `recipe_categories`
	const { error: category_error } = await supabase.from("recipe_categories").insert(
		recipe.categories.map((category) => ({
			recipe_id: recipe_data.id,
			category_id: category,
		}))
	);
	if (category_error) throw category_error;

	// TODO: Insert into `recipe_types`
	// TODO: Insert into `ingredients`
	// TODO: Insert into `images`
	// TODO: Insert into `steps`
};
