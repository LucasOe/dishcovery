<script lang="ts">
	import Mail from "$lib/assets/icons/confirm-mail.svg";

	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.data.title || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<div class="flex flex-col items-center justify-center gap-2">
		<img class="w-32 h-full" src={Mail} alt="Logo" />
		<h1 class="font-header text-xxl text-light">{$page.data.title || "Page Title"}</h1>
	</div>
	<slot />
</div>
