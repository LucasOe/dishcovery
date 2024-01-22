import { fetchRecipe } from "$lib/functions/database/recipes";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	const recipeDetails = await fetchRecipe(parseInt(params.recipe)).then((recipe) => {
		return recipe;
	});

	return {
		title: recipeDetails.name + " - Dishcovery",
		recipe: recipeDetails,
	};
};
