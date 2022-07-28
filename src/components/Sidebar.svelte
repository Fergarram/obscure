<script>
	import SearchIcon from './svgs/Search.svelte';
	import BackIcon from './svgs/Back.svelte';
	import ExternalIcon from './svgs/External.svelte';
	import InnerFileTree from './InnerFileTree.svelte';
	import { onMount } from 'svelte';

	export let fileTree, shortcuts;

	let showMobileMenu = true;

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
		const sidebar = document.getElementById('sidebar-wrapper');
		sidebar.style.display = showMobileMenu ? 'block' : '';
	};

	onMount(() => console.log(fileTree));
</script>

<div
	aria-hidden="true"
	on:click={toggleMobileMenu}
	class="lg:hidden backdrop-blur-sm fixed bg-black/40 w-auto h-full top-0 left-[calc(17rem_+_1px)] sm:left-[calc(18rem_+_1px)] md:left-[calc(18.5rem_+_1px)] right-0">
</div>
<button
	on:click={toggleMobileMenu}
	class="lg:hidden text-12 flex items-center gap-1.5 mt-3 py-4 border-b border-neutral-200 dark:border-neutral-700 w-full dark:hover:bg-neutral-700/20">
	<BackIcon size={20} />
	Hide Sidebar
</button>
<nav class="lg:hidden">
	<ul class="p-5 grid gap-3 pb-5 border-b border-neutral-200 dark:border-neutral-700">
		{#each shortcuts as item}
		<li>
			<a href={item.url} class="flex items-center gap-2 hover:underline" rel={item.ext ? 'noopener' : null}>
				{item.text}
				{#if item.ext}
					<ExternalIcon size={20}/>
				{/if}
			</a>
		</li>
	{/each}
	</ul>
</nav>
<aside class="block w-64 lg:pt-6 pr-6">
	<button
		on:click={() => console.log('hello')}
		class="hidden lg:flex items-center justify-between w-full rounded-16 border px-3 py-1.5 border-neutral-300 dark:border-neutral-700 flex items-center text-14 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-700/20 hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 shadow-lg shadow-white dark:shadow-neutral-800 relative z-[1]">
		<span class="flex items-center gap-1">
			<SearchIcon size={20} colorClass="fill-neutral-600 dark:fill-neutral-400" />
			Quick search...
		</span>
		<span>
			⌘O
		</span>
	</button>
	<div class="pt-4 lg:overflow-y-auto lg:max-h-[calc(100vh-3.75rem)] hide-scrollbars">
		<InnerFileTree {fileTree} expanded={true} />
		<div class="h-24"></div>
	</div>
</aside>