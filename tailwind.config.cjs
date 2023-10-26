const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
          50: '#e6f2fa',
          100: '#c1dff3',
          200: '#98caec',
          300: '#6eb5e4',
          400: '#4fa5de',
          500: '#3095d8',
          600: '#2b8dd4',
          700: '#2482ce',
          800: '#1e78c8',
          900: '#1367bf',
				},
			},
			fontFamily: {
				sans: ['Raleway', ...defaultTheme.fontFamily.sans],
			},
		},
	},
}