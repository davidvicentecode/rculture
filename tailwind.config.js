import daisyui from "daisyui"
import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Roboto"'],
			},
		},
	},
	plugins: [typography, daisyui],
	daisyui: {
		themes: ["emerald", "dracula"],
	},
}
