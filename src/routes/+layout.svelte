<script>
	import '../app.postcss';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<main class="px-12">
	{@render children?.()}
</main>
