import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Passwort zurücksetzen",
		subtitle: "Gib ein neues Passwort für deinen Account ein.",
	};
};
