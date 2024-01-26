<script lang="ts">
	import { page } from "$app/stores";
	import RoundButton from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";
	import { goto } from "$app/navigation";
</script>

<svelte:head>
	<title>{`${$page.data.title} - Dishcovery` || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 pb-24">
	<slot />
	<div class="fixed bottom-12 left-1/2 translate-x-[-50%]">
		<RoundButton src={CloseIcon} alt="Close" action={() => goto("/")} class="drop-shadow-md" size="md" />
	</div>
</div>
