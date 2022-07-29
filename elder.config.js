require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	origin: 'localhost:3000',
	lang: 'en',
	srcDir: 'src',
	distDir: 'public',
	rootDir: process.cwd(),
	build: {},
	prefix: '',
	server: {
		cacheRequests: false,
	},
	props: {
		hydration: isDev ? 'html' : 'hybrid',
		compress: true,
	},
	debug: {
		reload: false,
		stacks: false,
		hooks: false,
		performance: false,
		build: false,
		automagic: false,
	},
	hooks: {},
	plugins: {
		'@elderjs/plugin-images': {
			widths: [1280, 992, 768, 576, 400, 350, 200],
			fileTypes: ['webp'],
			folders: [
				{
					src: '/assets/images/*',
					output: '/images/',
				},
			],
		},
		'obsidian-parser': {
			home: 'readme',
			vault: 'vault',
			indexPattern: 'same-as-parent',
			routes: ['default'],
			useTableOfContents: true,
			useSyntaxHighlighting: {
				theme: 'css-variables', // available themes: https://github.com/shikijs/shiki/
			},
		}
	},
	shortcodes: { closePattern: '}}}', openPattern: '{{{' },
};
