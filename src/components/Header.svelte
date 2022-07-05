<script>
	import ExternalIcon from './svgs/External.svelte';
	const shortcuts = [
		{
			text: 'Cognitive Research',
			url: '/cognitive-research',
			ext: false
		},
		{
			text: 'OS Research',
			url: '/os-research',
			ext: false
		},
		{
			text: 'Roadmap',
			url: '/todo',
			ext: false
		},
		{
			text: 'Github',
			url: 'https://github.com/Fergarram/research-vault',
			ext: true
		},
	];
</script>
<header class="border-b border-neutral-200 dark:border-neutral-700 pb-5 flex items-center justify-between">
	<a href="/" class="font-semibold text-28 tracking-title block leading-100">
		Obscurity.Wiki
	</a>
	<ul class="flex items-center gap-8">
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
	<!-- Toolbar -->
</header>