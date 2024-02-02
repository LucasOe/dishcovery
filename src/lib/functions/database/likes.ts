import { supabase } from "$lib/functions/database/createClient";
import type { Recipe } from "$types/database.types";
import type { TablesInsert } from "$types/generated.types";

export const upsertLike = async (like: TablesInsert<"likes">) => {
	const { error } = await supabase.from("likes").upsert(like);
	if (error) throw error;
};

export const deleteLikes = async (userID: string) => {
	const { error } = await supabase.from("likes").delete().eq("user_id", userID);
	if (error) throw error;
};

export const fetchLikedRecipes = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("recipes")
		.select("*, categories(*), images(*), ingredients(*), steps(*), likes!inner(*)")
		.eq("likes.user_id", userID)
		.eq("likes.liked", true)
		.neq("user_id", userID); // exclude recipes uploaded by the user
	if (error) throw error;
	else return data;
};

export const fetchLikes = async (recipeID: number): Promise<number> => {
	const { data, error } = await supabase
		.from("likes")
		.select("*, recipes!inner(*)")
		.eq("recipes.id", recipeID)
		.eq("liked", true);
	if (error) throw error;
	else return data.length;
};

export const isLiked = async (recipeID: number, userID: string): Promise<boolean> => {
	const { data, error } = await supabase
		.from("likes")
		.select("*")
		.eq("recipe", recipeID)
		.eq("user_id", userID)
		.eq("liked", true)
		.maybeSingle();

	if (error) throw error;
	else return data !== null;
};



