import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Passwort vergessen",
		subtitle: "Gib deine E-Mail-Adresse ein um dein Passwort zurückzusetzen.",
	};
};
