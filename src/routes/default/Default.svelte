<script>
	import TableOfContents from '../../components/TableOfContents.svelte';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	export let data, helpers;
	const { frontmatter, tocTree } = data;
	const contentHasH1 = tocTree &&  tocTree.length > 0 && tocTree.find(i => i.depth === 1) ? true : false;
	// .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').replace(/\s+/g, ' ').trim();
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta name="description" content="test" />
	<link href="/" rel="canonical" />
</svelte:head>

<div class="dark:bg-neutral-800 min-h-screen text-neutral-800 dark:text-neutral-100">
	<div class="p-10 max-w-80rem mx-auto">
		<Header />
		<main class="grid grid-cols-auto-1fr">
			<Sidebar />
			<div class="py-6 px-10">
				<div class="grid grid-cols-1fr-auto gap-y-6 gap-x-10">
					{#if frontmatter && frontmatter.title && !contentHasH1}
						<h1 class="font-sans text-32 font-semibold leading-115 tracking-title mb-4 lg:text-40 col-start-1">
							{frontmatter.title}
						</h1>
					{/if}
					<TableOfContents />
					<div class="article-content col-start-1">
						{@html data.html}
					</div>
				</div>
			</div>
		</main>
		<Footer />
	</div>
</div>
