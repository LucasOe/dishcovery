import {supabase} from "$lib/functions/database/createClient";

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
	const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
	return usernameRegex.test(username);
};

export const userNameisTaken = async (username: string): Promise<boolean> => {
	const { data: users, error: userError } = await supabase
		.from("profiles")
		.select("id")
		.eq("username", username);

	if (userError) {
		throw userError;
	}

	return !!(users && users.length > 0);
}

export const validatePassword = (password: string): boolean => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
	return passwordRegex.test(password);
};

export const validateRecipeName = (recipeName: string): boolean => {
	const recipeNameRegex = /.{10,}/;
	return recipeNameRegex.test(recipeName);
};

export const validateRecipeDescription = (recipeDescription: string): boolean => {
	const recipeDescriptionRegex = /.{30,}/;
	return recipeDescriptionRegex.test(recipeDescription);
};

export const validateRecipeSteps = (recipeSteps: string): boolean => {
	const recipeStepsRegex = /.{30,}/;
	console.log(recipeStepsRegex.test(recipeSteps));
	return recipeStepsRegex.test(recipeSteps);
};
