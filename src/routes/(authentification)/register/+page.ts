import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Account erstellen",
		subtitle: "Wir haben uns schon auf dich gefreut.",
	};
};
