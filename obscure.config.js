module.exports = {
	useTableOfContents: true,
	useSyntaxHighlighting: {
		theme: 'css-variables', // available themes: https://github.com/shikijs/shiki/
	},
	routes: [
		{
			name: 'default',
			title: 'Obscurity.Wiki', // Used as a base for the site title when needed.
			prefix: '', // Default
			home: 'readme', // Default
			folderIndex: 'same-as-parent', // Default is 'index'
			mediaFolder: '/Media', // Default ?
		}
	],
};