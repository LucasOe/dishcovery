import { supabase } from "$lib/functions/database/createClient";
import type { Recipe, User } from "$types/database.types";

export const fetchCurrentUser = async (): Promise<User> => {
	const { data, error } = await supabase.auth.refreshSession();
	if (data.user) {
		return fetchUserDataById(data.user.id);
	} else throw error;
};

export const fetchUserDataById = async (userId: string): Promise<User> => {
	const { data, error } = await supabase.from("profiles").select(`*`).eq("id", userId).maybeSingle();
	if (data) return { ...data };
	else throw error;
};

export const fetchUserDataByUsername = async (username: string): Promise<User> => {
	const { data, error } = await supabase.from("profiles").select(`*`).ilike("username", username).maybeSingle();
	if (data) return { id: data.id, username: data.username, avatar_url: data.avatar_url };
	else throw error;
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



export const fetchRecipesInCookBook = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase.from('ratings').select(`
  recipes ( * )
`)
		.eq('user', userID)
		.eq('inCookBook', true)
	if (error) throw error;

	const recipes: Recipe[] = [];
	for (const object of data) {
		recipes.push(object.recipes as Recipe);
	}
	return { ...recipes };
};