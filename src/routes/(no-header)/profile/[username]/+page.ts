import { fetchUserDataByUsername } from "$lib/functions/database/user";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	return await fetchUserDataByUsername(params.username).then((user) => {
		if (!user) error(404, { message: "Not found" });
		return {
			title: user.username + " - Dishcovery",
			user: user,
		};
	});
};
