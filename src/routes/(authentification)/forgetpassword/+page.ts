import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Forget Password",
		subtitle: "Gib deine E-Mail-Adresse ein um dein Passwort zurückzusetzen.",
	};
};
