module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.svelte',
		'./src/**/*.html',
		'./src/**/*.js',
		'./src/**/*.ts',
	],
	theme: {
		fontFamily: {
			'content': [ 'JetBrains Mono', 'Courier New', 'monospace' ],
			'sans': [ '-apple-system', 'Inter', 'Roboto', 'Helvetica', 'Sans-Serif' ],
		},
		fontSize: {
			'paragraph': '0.8125rem',
			'12': '0.75rem',
			'13': '0.8125rem',
			'14': '0.875rem',
			'16': '1rem',
			'18': '1.125rem',
			'20': '1.25rem',
			'22': '1.35rem',
			'24': '1.5rem',
			'26': '1.625rem',
			'28': '1.75rem',
			'32': '2rem',
			'36': '2.25rem',
			'40': '2.5rem',
			'44': '2.75rem',
			'48': '3rem',
			'56': '3.5rem',
			'64': '4rem',
		},
		lineHeight: {
			'90':  '0.90',
			'100': '1.00',
			'110': '1.10',
			'115': '1.15',
			'125': '1.25',
			'135': '1.35',
			'150': '1.50',
			'165': '1.65',
			'175': '1.75',
		},
		letterSpacing: {
			'title': '-0.05em',
			'subtitle': '-0.03em',
			'paragraph': '-0.01em'
		},
		screens: {
			'xxs': '23.4375rem', // 375px
			'xs': '27rem',       // 432px
			'sm': '37.5rem',     // 600px
			'md': '48rem',       // 768px
			'lg': '64rem',       // 1024px
			'xl': '75rem',       // 1200px
			'xxl': '90rem',      // 1440px
			'3xl': '100rem',     // 1600px
		},
		zIndex: {
			'above-content': '101',
			'sticky-ui': '102',
			'sidebar': '103',
			'header': '104',
			'modal': '105',
		},
		extend: {
			columns: {
				'unset': 'unset',
			},
			borderRadius: {
				'2': '0.15rem',
				'4': '0.25rem',
				'8': '0.5rem',
				'12': '0.75rem',
				'16': '1rem',
				'20': '1.25rem',
			},
			spacing: {
				'112': '28rem',
				'128': '32rem',
				'144': '36rem',
				'192': '48rem',
				'256': '64rem',
			},
			gridTemplateColumns: {
				'1fr-auto': 'minmax(0, 1fr) auto',
				'auto-1fr': 'auto minmax(0, 1fr)'
			},
			gridTemplateRows: {
				'1fr-auto': '1fr auto',
				'auto-1fr': 'auto 1fr'
			},
			listStyleType: {
				roman: 'upper-roman',
			},
			height: {
				'unset': 'unset',
			},
			minWidth: ({ theme }) => ({
				'screen': '100vw',
				...theme('spacing')
			}),
			maxWidth: ({ theme }) => ({
				'24em': '24em',
				'30em': '30em',
				'40em': '40em',
				'80rem': '80rem',
				...theme('spacing')
			}),
			borderWidth: {
				'3': '3px'
			},
			outlineWidth: {
				'3': '3px'
			}
		},
	},
	variants: {
		extend: {
			margin: ['last']
		},
	},
	plugins: [],
};
