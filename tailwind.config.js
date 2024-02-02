/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			default: ["Work Sans, sans-serif"],
			header: ["Chewy, sans-serif"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			black: "#000000",
			gray: {
				900: "#212121",
				500: "#2c2c2c",
				"500-hover": "#3C3C3C",
				300: "#7d7c7c",
			},
			yellow: "#ffc532",
			light: "#f8f8f8",
			red: "#ed5d49",
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
				base: "0.875rem",
				xxl: "2rem",
			},
			borderRadius: {
				DEFAULT: "0.125rem", //2px
				xs: ".25rem", //4px
				sm: "0.75rem", //12px
				md: "1rem", //16px
				lg: "1.25rem", //20px
				xl: "3.125rem", //50px
				full: "9999px",
			},
			borderWidth: {
				DEFAULT: "0.125rem",
				sm: "0.125rem", //2px
				md: "0.25rem", //4px
			},
			boxShadow: {
				shadowGray: "0px 20px 70px 0px rgba(0, 0, 0, 0.72)",
				shadowSubtleGray: "0px 10px 40px 0px rgba(0, 0, 0, 0.52);",
				shadowYellow: "0px 20px 100px -35px rgba(255,197,50, .4)",
				shadowRed: "0px 20px 100px -35px rgba(237, 93, 73, .4)",
				shadowLight: "0px 20px 100px -35px rgba(255, 255, 255, .4)",
			},
			animation: {
				fade: "fade .3s ease",
			},
			keyframes: {
				fade: {
					"0%": { opacity: 0, transform: "translateY(3.125rem)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
};
