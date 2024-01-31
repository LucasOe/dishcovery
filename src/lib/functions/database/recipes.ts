import { supabase } from "$lib/functions/database/createClient";
import type { Recipe } from "$types/database.types";
import type { Filter } from "$types/filter.types";
import type { Tables, TablesInsert } from "$types/generated.types";

export const fetchRecipes = async (ids: number[], filters?: Filter): Promise<Recipe[]> => {
	let query = supabase.from("recipes").select(`*, categories(*), images(*), ingredients(*), steps(*)`).in("id", [ids]);

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);

	const { data, error } = await query;
	if (error) throw error;
	else return data;
};

export const fetchRecipesNotSeen = async (userID: string, filters?: Filter): Promise<Recipe[]> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), ratings(recipe)`)
		.eq("ratings.user_id", userID)
		.not(`user_id`, "eq", userID) // exclude recipes uploaded by the user
		.is("ratings", null); // recipe hasn't been rated by user

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);

	const { data, error } = await query.order("id").limit(3);
	if (error) throw error;
	else return data;
};

export const fetchRecipe = async (id: number): Promise<Recipe | null> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*)`)
		.eq("id", id)
		.maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchNextRecipe = async (currentId: number, filters?: Filter): Promise<Recipe | null> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*)`)
		.gt("id", currentId);

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);

	const { data, error } = await query.order("id").limit(1).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchNextRecipeNotSeen = async (
	currentId: number,
	userID: string,
	filters?: Filter
): Promise<Recipe | null> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), ratings(recipe)`)
		.eq("ratings.user_id", userID)
		.not(`user_id`, "eq", userID) // exclude recipes uploaded by the user
		.is("ratings", null) // recipe hasn't been rated by user
		.gt("id", currentId);

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);

	const { data, error } = await query.order("id").limit(1).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchRecipesInCookBook = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("ratings")
		.select(`recipes ( *, categories(*), images(*), ingredients(*), steps(*) )`)
		.eq("user_id", userID)
		.eq("inCookBook", true);
	if (error) throw error;

	const recipes: Recipe[] = [];
	for (const obj of data) {
		recipes.push(obj.recipes as Recipe);
	}

	return recipes;
};

export const removeRecipeFromCookBook = async (userID: string, recipeID: number): Promise<void> => {
	const { error } = await supabase
		.from("ratings")
		.update({ inCookBook: false })
		.eq("user_id", userID)
		.eq("recipe", recipeID);

	if (error) {
		console.error("Error removing recipe from cookbook:", error.message);
		throw error;
	}
};

export const fetchCategories = async (): Promise<Tables<"categories">[]> => {
	const { data, error } = await supabase.from("categories").select(`*`);
	if (error) throw error;
	else return data;
};

export const uploadRecipeImages = async (
	files: { recipe_id: number; image: Blob }[]
): Promise<TablesInsert<"images">[]> => {
	const paths: TablesInsert<"images">[] = [];
	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		const bucket_path = `recipe${file.recipe_id}-${index}.jpg`;
		const { data: path, error } = await supabase.storage.from("images").upload(bucket_path, file.image, {
			cacheControl: "3600",
			upsert: false,
		});
		if (error) throw error;

		const { data: publicUrl } = await supabase.storage.from("images").getPublicUrl(path.path);
		paths.push({
			recipe_id: file.recipe_id,
			image: publicUrl.publicUrl,
			bucket_path: bucket_path,
		});
	}
	return paths;
};

export const insertRecipe = async (recipe: TablesInsert<"recipes">): Promise<Tables<"recipes">> => {
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
	if (data) return data;
	else throw error;
};

export const insertRecipeCategories = async (categories: TablesInsert<"recipes_categories">[]) => {
	const { error } = await supabase.from("recipes_categories").insert(categories);
	if (error) throw error;
};

export const insertRecipeImages = async (images: TablesInsert<"images">[]) => {
	const { error } = await supabase.from("images").insert(images);
	if (error) throw error;
};

export const insertRecipeSteps = async (steps: TablesInsert<"steps">[]) => {
	const { error } = await supabase.from("steps").insert(steps);
	if (error) throw error;
};

export const insertRecipeIngredients = async (ingredients: TablesInsert<"ingredients">[]) => {
	const { error } = await supabase.from("ingredients").insert(ingredients);
	if (error) throw error;
};

export const deleteRecipe = async (id: number) => {
	const { data, error: image_error } = await supabase.from("images").select().eq("recipe_id", id);
	if (image_error) throw image_error;

	const { error: bucket_error } = await supabase.storage.from("images").remove(data.map((image) => image.bucket_path));
	if (bucket_error) throw bucket_error;

	const { error: recipe_error } = await supabase.from("recipes").delete().eq("id", id);
	if (recipe_error) throw recipe_error;
};
