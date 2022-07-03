module.exports = [
	{
		shortcode: 'yellow-box',
		run: async ({ content, props }) => {
			return {
				html: `<div class="box ${props.class}">${content}</div>`,
				css: '.box{border:1px solid red; padding: 1rem; margin: 1rem 0;} .box.yellow {background: lightyellow;}',
				js: '<script>var test = true;</script>',
				head: '<meta test="true"/>',
			};
		},
	}
];
