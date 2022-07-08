<script>
	import SearchIcon from './svgs/Search.svelte';
	import InnerFileTree from './InnerFileTree.svelte';
	import { onMount } from 'svelte';

	export let fileTree;

	const showOptionalSidebarTitle = false;

	onMount(() => console.log(fileTree));
</script>

<aside class="border-r border-neutral-200 dark:border-neutral-700 w-64 pt-6 pr-6 pb-6">
	{#if showOptionalSidebarTitle}
		<span class="block text-20 font-medium tracking-title mb-4">
			Optional Sidebar Title
		</span>
	{/if}
	<button
		on:click={() => console.log('hello')}
		class="w-full rounded-16 border px-3 py-1.5 border-neutral-300 dark:border-neutral-700 flex items-center text-14 text-neutral-600 dark:text-neutral-400 flex items-center justify-between dark:bg-neutral-700/20 hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 mb-6">
		<span class="flex items-center gap-1">
			<SearchIcon size={20} colorClass="fill-neutral-600 dark:fill-neutral-400" />
			Quick search...
		</span>
		<span>
			⌘K
		</span>
	</button>
	<div class="overflow-y-auto max-h-[calc(100vh-8rem)] hide-scrollbars">
		<InnerFileTree {fileTree} expanded={true} />
	</div>
</aside>