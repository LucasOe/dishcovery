import { fetchRecipe } from "$lib/functions/database/recipes";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	return await fetchRecipe(parseInt(params.recipe)).then((recipe) => {
		if (!recipe) error(404, { message: "Not found" });
		return {
			title: `${recipe.name} - Dishcovery`,
			recipe: recipe,
		};
	});
};
