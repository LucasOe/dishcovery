import { supabase } from "$lib/functions/database/createClient";
import type { TablesInsert } from "$types/generated.types";

export const fetchAverageRating = async (id: number): Promise<number> => {
	const { data, error } = await supabase.from("ratings").select("rating").eq("recipe", id);

	if (error) throw error;
	let rating = 0;
	let numberOfRatings = 0;

	if (!data) return 0;

	const validRatings = data.filter((item) => item.rating !== null && item.rating > 0);

	if (validRatings?.length > 0) {
		validRatings.forEach((item) => {
			rating += item.rating!;
			numberOfRatings++;
		});
		rating = rating / numberOfRatings;
	}
	return rating;
};

export const fetchRating = async (recipeID: number, userID: string): Promise<number | null> => {
	const { data, error } = await supabase
		.from("ratings")
		.select("rating")
		.eq("recipe", recipeID)
		.eq("user_id", userID)
		.single();
	if (error) throw error;
	return data.rating;
};

export const upsertRating = async (rating: TablesInsert<"ratings">) => {
	const { error } = await supabase.from("ratings").upsert(rating);
	if (error) throw error;
};

export const deleteRatings = async (userID: string) => {
	const { error } = await supabase.from("ratings").delete().eq("user_id", userID);
	if (error) throw error;
};
