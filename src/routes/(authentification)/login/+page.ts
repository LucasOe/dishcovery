import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		title: "Login",
		subtitle: "Wir haben und schon auf dich gefreut.",
	};
};
