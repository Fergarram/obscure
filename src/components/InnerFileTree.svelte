<script>
	import InnerFileTree from './InnerFileTree.svelte';
	import ChevronIcon from './svgs/Chevron.svelte';

	export let fileTree;
	export let classes = 'grid gap-4 text-12';
	export let expanded = false;

	if (fileTree && fileTree.length > 0) fileTree.forEach(item => item.expanded = expanded);
</script>

<ul class={classes}>
	{#each fileTree as subtree}
		<li class="whitespace-nowrap">
			{#if subtree.children.length > 0}
				<button class="flex items-center gap-1" on:click={() => subtree.expanded = !subtree.expanded}>
					<ChevronIcon size={20} classes={!subtree.expanded ? 'transition -rotate-90 -translate-x-px' : '-translate-x-px'} />
					<span>{subtree.name}</span>
				</button>
			{:else}
				<a class="block ml-6" href="/{subtree.path}">
					{subtree.name}
				</a>
			{/if}
			{#if subtree.expanded && subtree.children.length > 0}
				<div>
					<InnerFileTree
						expanded={true}
						fileTree={subtree.children}
						classes="pl-1.5 ml-2 text-12 grid gap-2 mt-2"
					/>
				</div>
			{/if}
		</li>
	{/each}
</ul>