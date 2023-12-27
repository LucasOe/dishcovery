import type { Recipe, Tables } from "$types/database.types";
import { supabase } from "./createClient";

export const fetchRecipes = async (): Promise<Recipe[]> => {
	const { data, error } = await supabase.from("recipes").select(`*, categories(*), types(*), ingredients(*), steps(*)`);
	if (data) return data;
	else throw error;
};

export const fetchTypes = async (): Promise<Tables<"types">[]> => {
	const { data, error } = await supabase.from("types").select(`*`);
	if (data) return data;
	else throw error;
};

export const fetchCategories = async (): Promise<Tables<"categories">[]> => {
	const { data, error } = await supabase.from("categories").select(`*`);
	if (data) return data;
	else throw error;
};
