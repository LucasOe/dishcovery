/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			yellow: '#FFC532',
			gray: {
				900: '#212121',
				500: '#2c2c2c',
				300: '#7d7c7c',
			},
			light: '#f8f8f8',
			red: '#ED5D49',
		},
		fontFamily: {
			'default': ['Work Sans, sans-serif'],
			'header': ['Chewy, sans-serif'],
		},
		extend: {
			spacing: {
				'sm': '0.625rem', //10px
			  	'md': '1.25rem', //20px
				'lg': '1.875rem', //30px
				'xl': '3.125rem', //50px
				'xxl': '6.25rem', //100px
			},
			borderRadius: {
				DEFAULT: "0.125rem", //2px
				'sm': '0.75rem', //12px
				'md': '1rem', //16px
				'lg': '1.25rem', //20px
				'xl': '3.125rem', //50px
				'full': "9999px"
			},
			borderWidth: {
				DEFAULT: '0.125rem', //2px
				'dc-md': '0.25rem' //4px
			},
		  }
	},
	plugins: []
};
