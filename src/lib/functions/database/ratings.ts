import { supabase } from "$lib/functions/database/createClient";
import type { TablesInsert } from "$types/generated.types";

export const fetchAverageRating = async (id: number): Promise<number> => {
	const { data, error } = await supabase.from("ratings").select("rating").eq("recipe", id);

	if (error) throw error;
	let rating = 0;
	let numberOfRatings = 0;

	if (!data) return 0;

	const validRatings = data.filter((item) => item.rating !== null);

	if (validRatings?.length > 0) {
		validRatings.forEach((item) => {
			rating += item.rating!;
			numberOfRatings++;
		});
		rating = rating / numberOfRatings;
	}
	return rating;
};

export const upsertRating = async (rating: TablesInsert<"ratings">) => {
	const { error } = await supabase.from("ratings").upsert(rating);
	if (error) throw error;
};

export const resetUserRatings = async (userID: string) => {
	const { error } = await supabase.from("ratings").delete().eq("user_id", userID);
	if (error) throw error;
};
