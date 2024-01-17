<script lang="ts">
	import HatYellow from "$lib/assets/icons/hat_yellow.svg";

	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.data.title || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 p-12">
	<div class="flex flex-col items-center justify-center gap-2">
		<img src={HatYellow} alt="Logo" />
		<h1 class="font-header text-xxl text-light">{$page.data.title || "Page Title"}</h1>
		<p class="text-xl font-bold text-gray-300">{$page.data.subtitle || "Page Subtitle"}</p>
	</div>
	<slot />
</div>
