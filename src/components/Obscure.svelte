<script>
	import TableOfContents from './TableOfContents.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Sidebar from './Sidebar.svelte';
	import CommentsControl from './CommentsControl.svelte';
	import ArrowRightIcon from './svgs/ArrowRight.svelte';
	import HomeIcon from './svgs/Home.svelte';

	export let data, shortcuts;

	const { frontmatter, breadcrumbs, tocTree, logo, routeFileTree } = data;
	const contentHasH1 =
		tocTree && tocTree.length > 0 && tocTree.find(i => i.depth === 1)
		? true
		: false;

	let showMobileMenu = false;
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta name="description" content="test" />
	<link href="/" rel="canonical" />
</svelte:head>

<div id="obscure" class="dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 min-h-screen">
	<div class="p-4 pt-0 sm:p-8 sm:pt-4 md:p-10 md:pt-6">
		<!-- Header -->
		<Header {shortcuts} bind:showMobileMenu />

		<div class="lg:grid lg:grid-cols-auto-1fr">

			<!-- Sidebar -->
			<Sidebar fileTree={routeFileTree} {shortcuts} bind:showMobileMenu />

			<!-- Main -->
			<main id="main-content" class="py-4 pt-8 lg:py-6 lg:px-10 w-full max-w-[60em] mx-auto">

				<!-- Breadcrumbs -->
				{#if breadcrumbs.length > 0}
					<ul class="overflow-auto hide-scrollbars flex gap-2 text-14 mb-6 lg:mb-8">
						<li class="opacity-80 dark:opacity-60 hover:opacity-100">
							<a href="/">
								<HomeIcon size={20}/>
							</a>
						</li>
						{#each breadcrumbs as item}
							<li class="flex items-center gap-2 opacity-80 dark:opacity-60 hover:opacity-100">
								<ArrowRightIcon size={16} classes="mt-px"/>
								<a href={item.url} class="whitespace-nowrap">
									{item.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}

				<!-- Article -->
				<article class="grid md:grid-cols-1fr-auto">
					{#if frontmatter && frontmatter.title && !contentHasH1}
						<h1 class="article-content__h1 mb-6 md:col-start-1 md:col-end-3">
							{frontmatter.title}
						</h1>
					{/if}

					<!-- ToC -->
					<TableOfContents {tocTree} backLinks={[]} classes="md:col-start-2 md:col-end-3 md:row-start-2 mb-2 md:mb-0 md:mt-6"/>

					<!-- Content -->
					<div class="article-content md:col-start-1 md:col-end-2 md:row-start-2 pb-10">
						{#if data.html}
							{#if data.html.includes('md-comment')}
								<CommentsControl />
							{/if}
							{@html data.html}
						{:else}
							<div class="w-full bg-neutral-100 dark:bg-neutral-700/20 p-4 rounded-4 border border-neutral-200 dark:border-neutral-600 flex items-center justify-center">
								This file is not populated yet.
							</div>
						{/if}
					</div>
				</article>
			</main>
		</div>

		<!-- Footer -->
		<Footer />
	</div>
</div>
