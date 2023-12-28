<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";

	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.data.title || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<div class="absolute right-10 z-10 flex justify-between">
		<div></div>
		<RoundButton src={CloseIcon} alt="Close" link={"/"} class="drop-shadow-md" size="md" />
	</div>

	<slot />
</div>
