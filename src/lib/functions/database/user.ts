import {supabase} from "$lib/functions/database/createClient";
import type {User} from "$types/database.types";
import {error} from "@sveltejs/kit";

export const fetchCurrentUserId = async (): Promise<string> => {
    const { data, error } = await supabase.auth.refreshSession();
    if (data.user) {
        return data.user.id
    }
    else throw error;
};

export const fetchUserData = async (userId: string): Promise<User> => {
    const {data, error: image_error } =
        await supabase.from("profiles")
            .select(`*`)
            .eq("id", userId)
            .maybeSingle();
    if (data) {
        return {
            id: data.id,
            username: data.username,
            avatar_url: data.avatar_url,
        };
    } else throw error;
}

export const deleteAvatarImage = async (userID: number): Promise<void> => {
    const { data, error } = await supabase
        .storage
        .from('avatars')
        .remove([`avatar_${userID}.jpg`])
    if (error) throw error;
}

export const uploadAvatarImage = async (userID: number, file: File): Promise<string> => {
    const { data: path, error } = await supabase
        .storage
        .from('avatars')
        .upload(`avatar_${userID}.jpg`, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) throw error;

    const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(path.path);

    return publicUrl.publicUrl;
};

export const insertAvatarImage = async (userID: number, image: string) => {
    const { error: image_error } = await supabase.from("profiles")
        .update({avatar_url: image})
        .match({id: userID})
    if (image_error) throw image_error;
};
