<script>
	let commentsShown = false;
	const showComments = () => {
		const els = document.querySelectorAll('.md-comment');
		if (els && els.length > 0) {
			els.forEach(el => {
				el.style.display = commentsShown ? 'none' : 'block';
			});
			commentsShown = !commentsShown;
		}
	};
</script>

<section
	class:-mb-4={!commentsShown}
	class="not-content bg-neutral-100 dark:bg-neutral-700/40 px-3 py-2 rounded-4 w-full flex items-center justify-between">
	This document has hidden comments.
	<button
		on:click={showComments}
		class="text-blue-700 dark:text-blue-300 hover:underline">
		{commentsShown ? 'Hide Comments' : 'Show Comments'}
	</button>
</section>