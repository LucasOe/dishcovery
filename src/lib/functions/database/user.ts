import { supabase } from "$lib/functions/database/createClient";
import type { Recipe } from "$types/database.types";
import type { Tables } from "$types/generated.types";

export const fetchUserDataById = async (userId: string): Promise<Tables<"profiles"> | null> => {
	const { data, error } = await supabase.from("profiles").select(`*`).eq("id", userId).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchUserDataByUsername = async (username: string): Promise<Tables<"profiles"> | null> => {
	const { data, error } = await supabase.from("profiles").select(`*`).ilike("username", username).maybeSingle();
	if (error) throw error;
	else return data;
};

export const deleteAvatarImage = async (userID: string) => {
	const { error } = await supabase.storage.from("avatars").remove([`avatar_${userID}.jpg`]);
	if (error) throw error;
};

export const uploadAvatarImage = async (file: File): Promise<string> => {
	const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	const { data: path, error } = await supabase.storage.from("avatars").upload(`avatar_${randomString}.jpg`, file, {
		cacheControl: "3600",
		upsert: false,
	});
	if (error) throw error;

	const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(path.path);
	return publicUrl.publicUrl;
};

export const insertAvatarImage = async (userID: string, image: string) => {
	const { error } = await supabase.from("profiles").update({ avatar_url: image }).match({ id: userID });
	if (error) throw error;
};

export const fetchUserRecipes = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, categories(*), images(*), ingredients(*), steps(*)`)
		.eq("user_id", userID);
	if (error) throw error;
	else return data;
};
