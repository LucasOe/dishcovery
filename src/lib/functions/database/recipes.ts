import { supabase } from "$lib/functions/database/createClient";
import type { Recipe } from "$types/database.types";
import type { Filter } from "$types/filter.types";
import type { Tables, TablesInsert } from "$types/generated.types";

export const fetchRecipesNotSeen = async (userID: string, filters?: Filter): Promise<Recipe[]> => {
	let query = supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*), likes(*), temp_categories:categories(*)`)
		.eq("likes.user_id", userID)
		.neq("user_id", userID) // exclude recipes uploaded by the user
		.is("likes", null); // recipe hasn't been rated by user

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.categories) query = query.not("temp_categories", "is", null);
	if (filters?.categories) query = query.eq("temp_categories.id", filters.categories);

	const { data, error } = await query.order("id").limit(3);
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
		.select("*, categories(*), images(*), ingredients(*), steps(*), likes(*), temp_categories:categories(*)")
		.eq("likes.user_id", userID)
		.neq("user_id", userID) // exclude recipes uploaded by the user
		.is("likes", null); // recipe hasn't been rated by user

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);
	if (filters?.categories) query = query.not("temp_categories", "is", null);
	if (filters?.categories) query = query.eq("temp_categories.id", filters.categories);

	const { data, error } = await query.gt("id", currentId).order("id").limit(1).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchRecipesWithFilter = async (filters?: Filter): Promise<Recipe[]> => {
	let query = supabase
		.from("recipes")
		.select("*, categories(*), images(*), ingredients(*), steps(*), temp_categories:categories(*)");

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);
	if (filters?.categories) query = query.not("temp_categories", "is", null);
	if (filters?.categories) query = query.eq("temp_categories.id", filters.categories);

	const { data, error } = await query.order("id").limit(3);
	if (error) throw error;
	else return data;
};

export const fetchNextRecipe = async (currentId: number, filters?: Filter): Promise<Recipe | null> => {
	let query = supabase
		.from("recipes")
		.select("*, categories(*), images(*), ingredients(*), steps(*), temp_categories:categories(*)");

	if (filters?.difficulty) query = query.eq("difficulty", filters.difficulty);
	if (filters?.cost) query = query.eq("cost", filters.cost);
	if (filters?.preperation_time) query = query.in("preperation_time", filters.preperation_time);
	if (filters?.categories) query = query.not("temp_categories", "is", null);
	if (filters?.categories) query = query.eq("temp_categories.id", filters.categories);

	const { data, error } = await query.gt("id", currentId).order("id").limit(1).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchRecipe = async (id: number): Promise<Recipe | null> => {
	const { data, error } = await supabase
		.from("recipes")
		.select("*, categories(*), images(*), ingredients(*), steps(*)")
		.eq("id", id)
		.maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchCategories = async (): Promise<Tables<"categories">[]> => {
	const { data, error } = await supabase.from("categories").select("*");
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
	const { data, error } = await supabase.from("recipes").insert(recipe).select().single();
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
