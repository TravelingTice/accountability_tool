/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			zIndex: {
				review: 2,
				modal: 5
			}
		}
	},

	plugins: []
}

module.exports = config
