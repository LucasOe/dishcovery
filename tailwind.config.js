/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			'dc-yellow': '#FFC532',
			'dc-grey-900': '#212121',
			'dc-grey-500': '#2c2c2c',
			'dc-grey-300': '#7d7c7c',
			'dc-light': '#f8f8f8',
			'dc-red': '#ED5D49',
		},
		fontFamily: {
		},
		extend: {
			spacing: {
				'dc-sm': '0.625rem', //10px
			  	'dc-md': '1.25rem', //20px
				'dc-lg': '1.875rem', //30px
				'dc-xl': '3.125rem', //50px
				'dc-xxl': '6.25rem', //100px
			},
			borderRadius: {
				'dc-sm': '0.75rem', //12px
				'dc-md': '1rem', //16px
				'dc-lg': '1.25rem', //20px
				'dc-xl': '3.125rem', //50px
			},
			borderWidth: {
				'dc-df': '0.125rem' //2px
			},
		  }
	},
	plugins: []
};
