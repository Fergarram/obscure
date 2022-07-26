<script>
	import TableOfContents from '../../components/TableOfContents.svelte';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import CommentsControl from '../../components/CommentsControl.svelte';
	import ArrowRightIcon from '../../components/svgs/ArrowRight.svelte';
	import HomeIcon from '../../components/svgs/Home.svelte';

	export let data;

	const { frontmatter, breadcrumbs, tocTree, logo, fileTree } = data;
	const contentHasH1 = tocTree &&  tocTree.length > 0 && tocTree.find(i => i.depth === 1) ? true : false;
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta name="description" content="test" />
	<link href="/" rel="canonical" />
</svelte:head>

<div class="dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 min-h-screen">
	<div class="p-4 sm:p-8 md:p-10">
	<!-- <div class="p-10 max-w-80rem mx-auto"> -->
		<Header />
		<main class="lg:grid lg:grid-cols-auto-1fr">
			<div class="sticky top-0 h-fit">
				<Sidebar hydrate-client={{ fileTree }} />
			</div>
			<!-- <div class="py-6 px-10"> -->
			<div class="py-4 pt-8 lg:py-6 lg:px-10 w-full max-w-[60em] mx-auto">
				{#if breadcrumbs.length > 0}
					<ul class="overflow-auto hide-scrollbars flex gap-2 text-14 mb-6 lg:mb-8">
						<li class="opacity-60 hover:opacity-100">
							<a href="/">
								<HomeIcon size={20}/>
							</a>
						</li>
						{#each breadcrumbs as item}
							<li class="flex items-center gap-2 opacity-60 hover:opacity-100">
								<ArrowRightIcon size={16} classes="mt-px"/>
								<a href={item.url} class="whitespace-nowrap">
									{item.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
				<div class="grid md:grid-cols-1fr-auto">
					{#if frontmatter && frontmatter.title && !contentHasH1}
						<h1 class="article-content__h1 mb-6 md:col-start-1 md:col-end-3">
							{frontmatter.title}
						</h1>
					{/if}
					<TableOfContents {tocTree} classes="md:col-start-2 md:col-end-3 md:row-start-2 mb-2 md:mb-0 md:mt-6"/>
					<div class="article-content md:col-start-1 md:col-end-2 md:row-start-2 pb-10">
						{#if data.html}
							{#if data.html.includes('md-comment')}
								<CommentsControl hydrate-client={{}} />
							{/if}
							{@html data.html}
						{:else}
							<div class="w-full bg-neutral-100 dark:bg-neutral-700/20 p-4 rounded-4 border border-neutral-200 dark:border-neutral-600 flex items-center justify-center">
								This file is not populated yet.
							</div>
						{/if}
					</div>
				</div>
			</div>
		</main>
		<Footer />
	</div>
</div>
