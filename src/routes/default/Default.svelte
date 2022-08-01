<script>
	import Obscure from '../../components/Obscure.svelte';

	export let data, request;

	const shortcuts = [
		{
			text: 'Start Here',
			url: '/',
			ext: false
		},
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
			text: 'Github',
			url: 'https://github.com/Fergarram/research-vault',
			ext: true
		},
	];
</script>

<Obscure hydrate-client={{ data, shortcuts }} />