<script lang="ts">
	import Mail from "$lib/assets/icons/confirm-mail.svg";

	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{`${$page.data.title} - Dishcovery` || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 p-12">
	<div class="flex flex-col items-center justify-center gap-2">
		<img class="h-full w-32" src={Mail} alt="Logo" />
		<h1 class="font-header text-xxl text-light">{$page.data.title || "Page Title"}</h1>
	</div>
	<slot />
</div>
