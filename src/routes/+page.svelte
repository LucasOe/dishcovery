<script lang="ts">
	import BottomNav from "$lib/components/BottomNav.svelte";
	import Card from "$lib/components/Card.svelte";
	import TopNav from "$lib/components/TopNav.svelte";

	import "../app.css";
</script>

<div class="h-[100dvh]">
	<div class="relative mx-auto flex h-full w-full max-w-[48rem] flex-col content-between gap-16 p-12">
		<main class="flex h-full w-full flex-col justify-center gap-16">
			<TopNav />
			<Card />
			<BottomNav />
		</main>
	</div>
</div>
