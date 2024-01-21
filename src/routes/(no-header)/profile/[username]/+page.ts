import type { PageLoad } from "./$types";
import { fetchUserDataByUsername } from "$lib/functions/database/user";
import type { User } from "$types/database.types";

export const load: PageLoad = async ({ params }) => {
	const user: User = await fetchUserDataByUsername(params.username).then((user) => {
		return user;
	});
	return {
		title: user.username + " - Dishcovery",
		user: user,
	};
};
