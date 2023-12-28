import type { Recipe, Tables } from "$types/database.types";
import { supabase } from "./createClient";

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
	const { data, error } = await supabase.from("recipes").select(`*, categories(*), types(*)`);
	if (data) return data;
	else throw error;
};

export const fetchRecipes = async (ids: number[]): Promise<Recipe[]> => {
	const { data, error } = await supabase.from("recipes").select(`*, categories(*), types(*)`).in("id", [ids]);
	if (data) return data;
	else throw error;
};
export const fetchRecipe = async (id: number): Promise<Recipe[]> => {
	const { data, error } = await supabase.from("recipes").select(`*, categories(*), types(*)`).in("id", [id]);
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
