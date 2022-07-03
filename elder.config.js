require('dotenv').config();
const slugify = require('./src/plugins/obsidian-parser/utils/slugify');
module.exports = {
	origin: 'localhost:3000',
	lang: 'en',
	srcDir: 'src',
	distDir: 'public',
	rootDir: process.cwd(),
	build: {},
	prefix: '',
	server: {},
	props: {
		hydration: 'hybrid',
		compress: false,
	},
	debug: {
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
			home: 'README',
			routes: ['default'],
			useTableOfContents: true,
			useSyntaxHighlighting: {
				theme: 'github-dark-dimmed', // available themes: https://github.com/shikijs/shiki/
			},
			slugFormatter: function(relativeFilePath, frontmatter) {
				let parts = relativeFilePath.replace('vault/', '').replace('.md', '').split('/');
				parts = parts.map(s => slugify(s).replace(/^-/g, ''));
				console.log(parts.join('/'));
				return parts.join('/');
			},
		}
	},
	shortcodes: { closePattern: '}}', openPattern: '{{' },
};
