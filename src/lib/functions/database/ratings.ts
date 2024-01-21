import { supabase } from "$lib/functions/database/createClient";
import type { Rating } from "$types/database.types";

export const fetchAverageRating = async (id: number): Promise<number> => {
	const { data, error } = await supabase.from("ratings").select("rating").eq("recipe", id);

	if (error) throw error;
	let rating = 0;

	if (data.length > 0) {
		data.forEach((item) => {
			rating += item.rating;
		});
		rating = rating /= data.length;
	}
	return rating;
};
