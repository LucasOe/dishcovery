import { supabase } from "$lib/functions/database/createClient";

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

export const upsertRating = async (
	userID: string,
	recipeID: number,
	rating: number | null,
	inCookBook: boolean | null
) => {
	const { error } = await supabase.from("ratings").upsert({
		inCookBook: inCookBook,
		rating: rating,
		recipe: recipeID,
		user_id: userID,
	});
	if (error) throw error;
};
