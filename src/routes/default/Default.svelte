<script>
	import TableOfContents from '../../components/TableOfContents.svelte';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import ArrowRightIcon from '../../components/svgs/ArrowRight.svelte';
	import HomeIcon from '../../components/svgs/Home.svelte';

	export let data;

	const { frontmatter, breadcrumbs, tocTree, logo, fileTree } = data;
	const contentHasH1 = tocTree &&  tocTree.length > 0 && tocTree.find(i => i.depth === 1) ? true : false;
	// .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').replace(/\s+/g, ' ').trim();
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta name="description" content="test" />
	<link href="/" rel="canonical" />
</svelte:head>

<div class="dark:bg-neutral-800 min-h-screen text-neutral-800 dark:text-neutral-100">
	<div class="p-10">
	<!-- <div class="p-10 max-w-80rem mx-auto"> -->
		<Header />
		<main class="grid grid-cols-auto-1fr">
			<div class="sticky top-0 h-fit">
				<Sidebar hydrate-client={{ fileTree }} />
			</div>
			<!-- <div class="py-6 px-10"> -->
			<div class="py-6 px-10 w-[60em] mx-auto">
				{#if breadcrumbs.length > 0}
					<ul class="flex gap-2 text-14 mb-8">
						<li>
							<a href="/">
								<HomeIcon size={20}/>
							</a>
						</li>
						{#each breadcrumbs as item}
							<li class="flex items-center gap-2">
								<ArrowRightIcon size={16} classes="mt-px"/>
								<a href={item.url} class="hover:underline">
									{item.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
				<div class="grid grid-cols-1fr-auto">
					{#if frontmatter && frontmatter.title && !contentHasH1}
						<h1 class="article-content__h1 mb-6 col-start-1 col-end-3">
							{frontmatter.title}
						</h1>
					{/if}
					<TableOfContents {tocTree} classes="col-start-2 col-end-3 row-start-2 mt-6"/>
					<div class="article-content col-start-1 col-end-2 row-start-2">
						{@html data.html}
					</div>
				</div>
			</div>
		</main>
		<Footer />
	</div>
</div>
