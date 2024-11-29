// Inspired by https://github.com/vanilla-extract-css/vanilla-extract/blob/master/site/src/themes.css.ts (Vanilla Extract uses deep-object-diff to compare theme)
export const name = "Vanill Extract Theme";
export const original = {
	fonts: {
		brand: 'Shrikhand, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		heading:
			'"DM Sans", "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		body: '-apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
		code: 'ml, "Roboto Mono", Menlo, monospace',
	},
	grid: "grid",
	spacing: {
		none: "0",
		xsmall: "1 * grid",
		small: "2 * grid",
		medium: "3 * grid",
		large: "5 * grid",
		xlarge: "8 * grid",
		xxlarge: "12 * grid",
		xxxlarge: "24 * grid",
	},
	contentWidth: {
		xsmall: "480",
		small: "600",
		standard: "740",
		large: "960",
		xlarge: "1120",
		xxlarge: "1350",
	},
	heading: {
		h1: {
			mobile: {
				fontSize: 36,
				rows: 12,
			},
			tablet: {
				fontSize: 52,
				rows: 15,
			},
			desktop: {
				fontSize: 52,
				rows: 15,
			},
		},
		h2: {
			mobile: {
				fontSize: 28,
				rows: 10,
			},
			tablet: {
				fontSize: 38,
				rows: 12,
			},
			desktop: {
				fontSize: 38,
				rows: 12,
			},
		},
		h3: {
			mobile: {
				fontSize: 24,
				rows: 8,
			},
			tablet: {
				fontSize: 30,
				rows: 10,
			},
			desktop: {
				fontSize: 30,
				rows: 10,
			},
		},
		h4: {
			mobile: {
				fontSize: 22,
				rows: 8,
			},
			tablet: {
				fontSize: 22,
				rows: 9,
			},
			desktop: {
				fontSize: 22,
				rows: 9,
			},
		},
		text: {
			standard: {
				mobile: {
					fontSize: 18,
					rows: 9,
				},
				tablet: {
					fontSize: 20,
					rows: 10,
				},
				desktop: {
					fontSize: 20,
					rows: 10,
				},
			},
			code: {
				mobile: {
					fontSize: 13,
					rows: 6,
				},
				tablet: {
					fontSize: 14,
					rows: 7,
				},
				desktop: {
					fontSize: 14,
					rows: 7,
				},
			},
			small: {
				mobile: {
					fontSize: 16,
					rows: 8,
				},
				tablet: {
					fontSize: 16,
					rows: 8,
				},
				desktop: {
					fontSize: 16,
					rows: 8,
				},
			},
			xsmall: {
				mobile: {
					fontSize: 15,
					rows: 7,
				},
				tablet: {
					fontSize: 15,
					rows: 7,
				},
				desktop: {
					fontSize: 15,
					rows: 7,
				},
			},
		},
		weight: {
			regular: "400",
			strong: "700",
		},
		palette: {
			white: "#fff",
			black: "#0e0e10",

			red: "colors.red['500']",
			yellow: "colors.yellow['300']",
			green50: "colors.emerald['50']",
			green200: "colors.emerald['200']",
			green300: "colors.emerald['300']",
			green400: "colors.emerald['400']",
			green500: "colors.emerald['500']",
			green600: "colors.emerald['600']",

			coolGray50: "colors.coolGray['50']",
			coolGray100: "colors.coolGray['100']",
			coolGray200: "colors.coolGray['200']",
			coolGray300: "colors.coolGray['300']",
			coolGray400: "colors.coolGray['400']",
			coolGray500: "colors.coolGray['500']",
			coolGray600: "colors.coolGray['600']",
			coolGray700: "colors.coolGray['700']",
			coolGray800: "colors.coolGray['800']",
			coolGray900: "colors.coolGray['900']",

			gray50: "colors.gray['50']",
			gray100: "colors.gray['100']",
			gray200: "colors.gray['200']",
			gray300: "colors.gray['300']",
			gray400: "colors.gray['400']",
			gray500: "colors.gray['500']",
			gray600: "colors.gray['600']",
			gray700: "colors.gray['700']",
			gray800: "colors.gray['800']",
			gray900: "colors.gray['900']",

			blueGray800: "colors.blueGray['800']",
			blueGray900: "colors.blueGray['900']",

			teal50: "colors.teal['50']",
			teal100: "colors.teal['100']",
			teal200: "colors.teal['200']",
			teal200muted: "#b6eee3",
			teal300: "colors.teal['300']",
			teal400: "colors.teal['400']",
			teal500: "colors.teal['500']",
			teal600: "colors.teal['600']",
			teal700: "colors.teal['700']",
			teal800: "colors.teal['800']",
			teal900: "colors.teal['900']",

			blue50: "colors.sky['50']",
			blue100: "colors.sky['100']",
			blue200: "colors.sky['200']",
			blue300: "colors.sky['300']",
			blue400: "colors.sky['400']",
			blue500: "colors.sky['500']",
			blue600: "colors.sky['600']",
			blue700: "colors.sky['700']",
			blue800: "colors.sky['800']",
			blue900: "colors.sky['900']",

			pink50: "colors.fuchsia['50']",
			pink100: "colors.fuchsia['100']",
			pink200: "colors.fuchsia['200']",
			pink300: "colors.fuchsia['300']",
			pink400: "colors.fuchsia['400']",
			pink500: "colors.fuchsia['500']",
			pink600: "colors.fuchsia['600']",
			pink700: "colors.fuchsia['700']",
			pink800: "colors.fuchsia['800']",
			pink900: "colors.fuchsia['900']",
		},
		border: {
			width: {
				standard: "1 * grid",
				large: "2 * grid",
			},
			radius: {
				small: "2 * grid",
				medium: "4 * grid",
				large: "7 * grid",
				full: "9999px",
			},
		},
	},
};
export const changed = structuredClone(original);
// the lack of changes is intentional
