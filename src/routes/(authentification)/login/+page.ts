import type { PageLoad } from "../login/$types";

export const load: PageLoad = async () => {
	return {
		title: "Login",
		subtitle: "Wir haben uns schon auf dich gefreut.",
	};
};
