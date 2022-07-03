<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	export let templateHtml;
</script>

<!-- Global Head -->
<svelte:head>
	<link rel="stylesheet" type="text/css" href="/styles.css">
</svelte:head>

<div class="dark:bg-neutral-800 min-h-screen text-neutral-800 dark:text-neutral-100">
	<div class="p-10 max-w-80rem mx-auto">
		<Header />
		<main class="grid grid-cols-auto-1fr">
			<Sidebar />
			<div class="py-6 px-10">
				{@html templateHtml}
			</div>
		</main>
		<Footer />
	</div>
</div>