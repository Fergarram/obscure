<script>
	import InnerFileTree from './InnerFileTree.svelte';
	import ChevronIcon from './svgs/Chevron.svelte';
	import { slide } from 'svelte/transition';

	export let fileTree;
	export let classes = 'flex flex-col gap-4 text-12';
	export let expanded = false;

	if (fileTree && fileTree.length > 0) fileTree.forEach(item => item.expanded = expanded);
</script>

<ul class={classes}>
	{#each fileTree as subtree}
		<li>
			{#if subtree.children.length > 0}
				<button class="flex items-center gap-1" on:click={() => subtree.expanded = !subtree.expanded} title="{subtree.name}">
					<ChevronIcon size={20} classes="transition -translate-x-px {!subtree.expanded ? '-rotate-90' : ''}" />
					<span class="truncate">
						{subtree.name}
					</span>
				</button>
			{:else}
				<a class="block ml-6 truncate" href="/{subtree.path}" title="{subtree.name}">
					{subtree.name}
				</a>
			{/if}
			{#if subtree.expanded && subtree.children.length > 0}
				<div transition:slide>
					<InnerFileTree
						expanded={true}
						fileTree={subtree.children}
						classes="pl-1.5 ml-2 text-12 flex flex-col gap-2 mt-2"
					/>
				</div>
			{/if}
		</li>
	{/each}
</ul>