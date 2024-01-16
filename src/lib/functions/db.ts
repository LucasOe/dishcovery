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
	if (data.user) {
		return {
			id: data.user.id,
			username: data.user.user_metadata.username,
			email: data.user.email!,
			avatar_url: data.user.user_metadata.avatar_url,
		};
	} else throw error;
};

export const uploadRecipeImages = async (id: number, files: Blob[]): Promise<string[]> => {
	const paths: string[] = [];
	files.forEach(async (file, index) => {
		const { data, error } = await supabase.storage.from("images").upload(`recipe${id}-${index}.jpg`, file, {
			cacheControl: "3600",
			upsert: false,
		});
		if (error) throw error;

		const { data: path } = supabase.storage.from("images").getPublicUrl(data.path);
		paths.push(path.publicUrl);
	});
	return paths;
};

export const insertRecipe = async (recipe: {
	cost: number;
	description: string;
	difficulty: number;
	name: string;
	preperation_time: number;
}): Promise<number> => {
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

	return recipe_data.id;
};

export const insertRecipeCategories = async (id: number, categories: number[]) => {
	const { error: category_error } = await supabase.from("recipes_categories").insert(
		categories.map((category) => ({
			recipe_id: id,
			category_id: category,
		}))
	);
	if (category_error) throw category_error;
};

export const insertRecipeTypes = async (id: number, types: number[]) => {
	const { error: type_error } = await supabase.from("recipes_types").insert(
		types.map((type) => ({
			recipe_id: id,
			type_id: type,
		}))
	);
	if (type_error) throw type_error;
};

export const insertRecipeImages = async (id: number, images: string[]) => {
	const { error: image_error } = await supabase.from("images").insert(
		images.map((image) => ({
			recipe_id: id,
			image: image,
		}))
	);
	if (image_error) throw image_error;
};
