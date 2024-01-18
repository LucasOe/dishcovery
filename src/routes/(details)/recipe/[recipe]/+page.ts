import type { PageLoad } from "./$types";
import { selectedRecipe } from "$lib/functions/stores";
import { fetchRecipe } from "$lib/functions/database/recipes";

export const load: PageLoad = async ({ params }) => {
	const recipeDetails = await fetchRecipe(parseInt(params.recipe)).then((recipe) => {
		return recipe;
	});
	selectedRecipe.set(recipeDetails);

	return {
		title: recipeDetails.name + " - Dishcovery",
		recipe: recipeDetails,
	};
};
