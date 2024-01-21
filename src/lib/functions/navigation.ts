import { goto } from "$app/navigation";

export const navigateHome = () => {
	goto("/");
};

export const navigateToRecipe = (id: number) => {
	goto("recipe/" + id);
}