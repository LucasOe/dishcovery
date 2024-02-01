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
