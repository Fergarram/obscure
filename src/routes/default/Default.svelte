<script>
	import TableOfContents from '../../components/TableOfContents.svelte';
	export let data, helpers;
	const { frontmatter } = data;
</script>

<svelte:head>
	<title>test</title>
	<meta name="description" content="test" />
	<link href="/" rel="canonical" />
</svelte:head>

<div class="grid grid-cols-1fr-auto gap-x-10">
	<!-- <h1 class="text-48 leading-115 tracking-title font-semibold mb-8 col-start-1">
		{title}
	</h1> -->
	<TableOfContents />
	<div class="article-content col-start-1">
		{@html data.html}
	</div>
</div>