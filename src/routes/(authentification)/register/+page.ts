import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Account erstellen",
		subtitle: "Wir haben und schon auf dich gefreut.",
	};
};
