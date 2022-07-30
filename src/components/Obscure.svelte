<script>
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';
	import TableOfContents from './TableOfContents.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Sidebar from './Sidebar.svelte';
	import Modal from './Modal.svelte';
	import CommentsControl from './CommentsControl.svelte';
	import ArrowRightIcon from './svgs/ArrowRight.svelte';
	import SearchIcon from './svgs/Search.svelte';
	import HomeIcon from './svgs/Home.svelte';

	export let data, shortcuts;

	const { frontmatter, breadcrumbs, tocTree, logo, routeFileTree, flatFileList } = data;
	const fuse = new Fuse(flatFileList, {
		includeScore: true,
		includeMatches: true,
		keys: [ 'name', 'path' ]
	});
	const contentHasH1 =
		tocTree && tocTree.length > 0 && tocTree.find(i => i.depth === 1)
		? true
		: false;

	let showMobileMenu = false;
	let showSearchDialog = false;
	let keysPressed = [];
	let searchQuery = '';
	let searchFocused = false;
	let searchInputEl = null;
	let lastPos = 0;
	let mounted = false;
	let results = [];
	let selectedResultItem = '';
	let resultsEl = null;

	const lock = (mobileOnly = false) => {
		if (document.body.style.position === 'fixed') return;

		lastPos = window.scrollY;
		let bodyWidth = document.body.getClientRects()[0].width;
		let widthDiff = window.innerWidth - bodyWidth;

		document.body.style.position = 'fixed';
		document.body.style.overflow = 'hidden';
		document.body.style.top = `-${lastPos}px`;
		if (mobileOnly) document.body.classList.add('mobile-only-scroll-lock');

		if (widthDiff !== 0) {
			document.body.style.width = `${bodyWidth}px`;
			document.body.classList.add('scroll-lock');
		} else {
			document.body.style.width = '100%';
		}
	};

	const unlock = (mobileOnly = false) => {
		document.body.classList.remove('scroll-lock');
		if (mobileOnly) document.body.classList.remove('mobile-only-scroll-lock');
		document.body.style.removeProperty('position');
		document.body.style.removeProperty('overflow');
		document.body.style.removeProperty('width');
		document.body.style.removeProperty('top');
		window.scroll(0, lastPos);
	};

	const handleModalClose = () => {
		showSearchDialog = false;
		searchQuery = '';
		unlock();
	};

	const handleModalOpen = () => {
		lock();
		if (searchInputEl) searchInputEl.focus();
	};

	const onKeyup = (e) => {
		keysPressed = [];
	};

	const onKeydown = (e) => {
		keysPressed[e.key] = true;

		if (keysPressed['Escape']) showMobileMenu = false;

		if (
			(keysPressed['Meta'] && keysPressed['o']) ||
			(keysPressed['Control'] && keysPressed['o'])
		) {
			if (showMobileMenu) return;
			showSearchDialog = true;
		}
	};

	const handleInputKeydown = (e) => {
		if (e.key === 'Enter') {
			location.href = `${location.origin}/${selectedResultItem}`;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (results.length > 0) {
				// Focus on the element below the currently selected item
				const el = document.getElementById(`result-${selectedResultItem}`);
				const nextEl = el.nextElementSibling;
				if (nextEl) {
					const url = nextEl.firstElementChild.dataset.url;
					if (url) selectedResultItem = url;
					const topSpacing = 12; // @TODO: get from resultsEl
					const pos = (nextEl.offsetTop + nextEl.offsetHeight) - topSpacing - resultsEl.scrollTop;
					if (pos > resultsEl.offsetHeight) {
						const diff = pos - resultsEl.offsetHeight;
						resultsEl.scroll(0, resultsEl.scrollTop + diff + 15);
					}
				}
			}
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (results.length > 0) {
				// Focus on the element above the currently selected item
				const el = document.getElementById(`result-${selectedResultItem}`);
				const previousEl = el.previousElementSibling;
				if (previousEl) {
					const url = previousEl.firstElementChild.dataset.url;
					if (url) selectedResultItem = url;
					const topSpacing = 12; // @TODO: get from resultsEl
					const pos = previousEl.offsetTop - topSpacing - resultsEl.scrollTop;
					if (pos < 0) {
						const diff = 0 - pos;
						resultsEl.scroll(0, resultsEl.scrollTop - (diff - 5));
					}
				}
			}
		}
	};

	onMount(() => {
		mounted = true;
		document.addEventListener('keyup', onKeyup);
		document.addEventListener('keydown', onKeydown);
	});

	$: if (mounted) {
		if (showMobileMenu) lock(true);
		else if (!showMobileMenu) unlock(true);
	}

	$: {
		results = fuse.search(searchQuery);
		if (results.length > 0) selectedResultItem = results[0].item.url;
		// console.log(results);
	};
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta name="description" content="test" />
	<link href="/" rel="canonical" />
</svelte:head>

<div id="obscure" class="dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 min-h-screen">
	<div class="p-4 pt-0 sm:p-8 sm:pt-4 md:p-10 md:pt-6">
		<!-- Header -->
		<Header {shortcuts} bind:showMobileMenu bind:showSearchDialog />

		<div class="lg:grid lg:grid-cols-auto-1fr">

			<!-- Sidebar -->
			<Sidebar fileTree={routeFileTree} {shortcuts} bind:showMobileMenu bind:showSearchDialog />

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
				{#if showSearchDialog}
					<Modal
						id="file-search"
						ariaLabel="Search documents"
						autoPlaceModal={false}
						wrapperClasses="p-4 focus:outline-none"
						modalClasses="max-w-40em mx-auto dark:bg-neutral-800 bg-neutral-200 rounded-8 top-2 md:top-1/4"
						on:modal-close={handleModalClose}
						on:modal-open={handleModalOpen}>
						<div class="flex items-center gap-2 max-w-full w-full">
							<SearchIcon />
							<label for="file-search-input" class="block relative max-w-full w-full">
								<span class="absolute pointer-events-none opacity-60" class:hidden={searchQuery}>
									Search files in vault...
								</span>
								<input
									type="text"
									id="file-search-input"
									bind:this={searchInputEl}
									bind:value={searchQuery}
									class="bg-transparent focus:outline-none max-w-full w-full"
									on:keydown={handleInputKeydown}
									on:focus={() => searchFocused = true}
									on:blur={() => searchFocused = false}
								/>
							</label>
						</div>
						{#if results.length > 0}
							<ul
								bind:this={resultsEl}
								aria-label="search results"
								class="relative max-h-[calc(100vh_-_7.5rem)] md:max-h-[40vh] overflow-auto h-fit mt-3 pt-3 border-t border-neutral-300 dark:border-neutral-600 w-full">
								{#each results as result}
									<li class="text-16 w-full" id="result-{result.item.url}">
										<a
											data-url={result.item.url}
											href="/{result.item.url}"
											on:mouseover={() => selectedResultItem = result.item.url}
											class="grid gap-1 w-full rounded-8 p-2 {selectedResultItem === result.item.url ? 'dark:bg-neutral-700/50 bg-neutral-100' : ''}">
											{result.item.name}
												<p class="text-12 opacity-60">
												{result.item.path}
											</p>
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</Modal>
				{/if}
			</main>
		</div>

		<!-- Footer -->
		<Footer />
	</div>
</div>
