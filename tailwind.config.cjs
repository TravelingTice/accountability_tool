/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				heading: ['Bebas Neue', 'sans-serif']
			},
			zIndex: {
				review: 2,
				modal: 5
			}
		}
	},

	plugins: []
}

module.exports = config
