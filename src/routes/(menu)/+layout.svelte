<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";

	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.data.title || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<div class="flex justify-between">
		<h1 class="font-header text-xxl text-light">{$page.data.title || "Page Title"}</h1>
		<RoundButton src={CloseIcon} alt="Close" link={"/"} class="drop-shadow-md" size="md" />
	</div>

	<slot />
</div>
