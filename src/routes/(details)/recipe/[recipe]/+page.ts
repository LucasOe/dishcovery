import type { PageLoad } from './$types';
import {fetchRecipe} from "$lib/functions/db";
import {selectedRecipe} from "$lib/functions/stores";

export const load: PageLoad = async ({ params }) => {

	const recipeDetails = await fetchRecipe(parseInt(params.recipe))
			.then((recipe) => {
				return recipe
			})
	selectedRecipe.set(recipeDetails)


	return {
		title: recipeDetails.name + " - Dishcovery",
		recipe: recipeDetails
	};
};
