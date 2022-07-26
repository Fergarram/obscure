module.exports = [
	{
		shortcode: 'mdComment',
		run: async ({ content, props }) => {
			return {
				html: `<div class="md-comment">${content}</div>`,
				css: '',
				js: '',
				head: '',
			};
		},
	}
];
