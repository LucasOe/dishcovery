<script>
	import Header from './Header.svelte';
	import './styles.css';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex flex-1 flex-col p-4 w-full max-w-[64rem] my-0 mx-auto box-border">
		<slot />
	</main>

	<footer class="flex flex-col justify-center items-center p-4">
		<p>
			visit <a href="https://kit.svelte.dev" class="font-bold">kit.svelte.dev</a> to learn SvelteKit
		</p>
	</footer>
</div>
