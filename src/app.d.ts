// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface PageData {
			title: string;
		}
	}

	namespace svelteHTML {
		// prettier-ignore
		interface HTMLAttributes {
			"on:panstart"?: (event: CustomEvent) => void;
			"on:panmove"?: (event: CustomEvent) => void;
			"on:panend"?: (event: CustomEvent) => void;
		}
	}
}

export {};
