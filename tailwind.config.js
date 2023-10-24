/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			transparent: "transparent",
			yellow: "#FFC532",
			gray: {
				900: "#212121",
				500: "#2c2c2c",
				300: "#7d7c7c",
			},
			light: "#f8f8f8",
			red: "#ED5D49",
		},
		fontFamily: {
			default: ["Work Sans, sans-serif"],
			header: ["Chewy, sans-serif"],
		},
		extend: {
			spacing: {
				xs: "0.3125rem", //5px
				sm: "0.625rem", //10px
				md: "1.25rem", //20px
				lg: "1.875rem", //30px
				xl: "2.5rem", //40px
				xxl: "3.125rem", //50px
				xxxl: "6.25rem", //100px
			},
			fontSize: {
				"fs-text": "14px",
				"fs-header": "32px",
			},
			borderRadius: {
				DEFAULT: "0.125rem", //2px
				sm: "0.75rem", //12px
				md: "1rem", //16px
				lg: "1.25rem", //20px
				xl: "3.125rem", //50px
				full: "9999px",
			},
			borderWidth: {
				"bw-sm": "0.125rem", //2px
				"bw-md": "0.25rem", //4px
			},
			boxShadow: {
				shadow: "0px 20px 100px -35px rgba(0, 0, 0, 0.72)",
			},
		},
	},
	plugins: [],
};
