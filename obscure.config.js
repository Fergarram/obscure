module.exports = {
	home: 'readme',
	vault: 'vault', // @FIXME: Remove this prop because it makes no sense if multiple routes or make the 'routes' array an object array.
	indexPattern: 'same-as-parent',
	mediaFolder: '/Media', // Path relative to vault's root dir. @FIXME: Make this per route.
	routes: ['default'],
	useTableOfContents: true,
	useSyntaxHighlighting: {
		theme: 'css-variables', // available themes: https://github.com/shikijs/shiki/
	},
};