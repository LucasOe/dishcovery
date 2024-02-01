import { supabase } from "$lib/functions/database/createClient";
import type { Recipe } from "$types/database.types";
import type { Tables } from "$types/generated.types";

export const fetchUserDataById = async (userId: string): Promise<Tables<"profiles"> | null> => {
	const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
	if (error) throw error;
	else return data;
};

export const fetchUserDataByUsername = async (username: string): Promise<Tables<"profiles"> | null> => {
	const { data, error } = await supabase.from("profiles").select("*").ilike("username", username).maybeSingle();
	if (error) throw error;
	else return data;
};

export const upsertAvatarImage = async (userID: string, file: File): Promise<string> => {
	const userProfile = await fetchUserDataById(userID);
	if (userProfile && userProfile.avatar_url) {
		// Extract image name from URL
		const oldAvatarName = userProfile.avatar_url.split("/").pop();
		if (oldAvatarName) {
			// Delete old avatar image
			await deleteAvatarImage(oldAvatarName);
		}
	}

	const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	const { data: path, error } = await supabase.storage
		.from("avatars")
		.upload(`avatar_${userID}_${randomString}.jpg`, file, {
			cacheControl: "3600",
			upsert: false,
		});
	if (error) throw error;

	const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(path.path);
	return publicUrl.publicUrl;
};

export const deleteAvatarImage = async (imageName: string) => {
	const { error } = await supabase.storage.from("avatars").remove([imageName]);
	if (error) throw error;
};

export const insertAvatarImage = async (userID: string, url: string) => {
	const { error } = await supabase.from("profiles").update({ avatar_url: url }).match({ id: userID });
	if (error) throw error;
};

export const fetchUserRecipes = async (userID: string): Promise<Recipe[]> => {
	const { data, error } = await supabase
		.from("recipes")
		.select("*, categories(*), images(*), ingredients(*), steps(*)")
		.eq("user_id", userID);
	if (error) throw error;
	else return data;
};
