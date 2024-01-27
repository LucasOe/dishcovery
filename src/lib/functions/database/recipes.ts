import { supabase } from "$lib/functions/database/createClient";
import type {
	Category,
	InsertImage,
	InsertIngredient,
	InsertRecipe,
	InsertRecipeCategory,
	InsertRecipeType,
	InsertStep,
	Recipe,
	Type,
} from "$types/database.types";
import type { Filter } from "$types/filter.types";

export const fetchRecipes = async (ids: number[], filters?: Filter): Promise<Recipe[]> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.in("id", [ids]);

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);

	const { data, error } = await query;
	if (error) throw error;
	else return data;
};

export const fetchRecipesNotSeen = async (userID: string, filters?: Filter): Promise<Recipe[]> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*), ratings(recipe)`)
		.eq("ratings.user_id", userID)
		.is("ratings", null); // recipe hasn't been rated by user

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);

	const { data, error } = await query.order("id").limit(3);
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

export const fetchNextRecipe = async (currentId: number, filters?: Filter): Promise<Recipe | null> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*)`)
		.gt("id", currentId);

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);

	const { data, error } = await query.order("id").limit(1).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchNextRecipeNotSeen = async (
	currentId: number,
	userID: string,
	filter?: Filter
): Promise<Recipe | null> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), types(*), ratings(recipe)`)
		.eq("ratings.user_id", userID)
		.is("ratings", null) // recipe hasn't been rated by user
		.gt("id", currentId);

	if (filter?.difficulty) query = query.eq("difficulty", filter.difficulty);

	const { data, error } = await query.order("id").limit(1).maybeSingle();
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

export const fetchTypes = async (): Promise<Type[]> => {
	const { data, error } = await supabase.from("types").select(`*`);
	if (error) throw error;
	else return data;
};

export const fetchCategories = async (): Promise<Category[]> => {
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

export const insertRecipe = async (recipe: InsertRecipe): Promise<number> => {
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

export const insertRecipeCategories = async (categories: InsertRecipeCategory[]) => {
	const { error } = await supabase.from("recipes_categories").insert(categories);
	if (error) throw error;
};

export const insertRecipeTypes = async (types: InsertRecipeType[]) => {
	const { error } = await supabase.from("recipes_types").insert(types);
	if (error) throw error;
};

export const insertRecipeImages = async (images: InsertImage[]) => {
	const { error } = await supabase.from("images").insert(images);
	if (error) throw error;
};

export const insertRecipeSteps = async (steps: InsertStep[]) => {
	const { error } = await supabase.from("steps").insert(steps);
	if (error) throw error;
};

export const insertRecipeIngredients = async (ingredients: InsertIngredient[]) => {
	const { error } = await supabase.from("ingredients").insert(ingredients);
	if (error) throw error;
};

export const deleteRecipe = async (id: number) => {
	const { error } = await supabase.from("recipes").delete().eq("id", id);
	if (error) throw error;
};
