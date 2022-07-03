<script>
	export let templateHtml;
</script>

<!-- Global Head -->
<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta name="theme-color" content="#333333">
	<link rel="stylesheet" type="text/css" href="/styles.css">
</svelte:head>

{@html templateHtml}