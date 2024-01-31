import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Login",
		subtitle: "Wir haben uns schon auf dich gefreut.",
	};
};
