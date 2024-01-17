<script lang="ts">
	import { page } from "$app/stores";
	import {navigateHome} from "$lib/functions/navigation";
	import RoundButton from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";
</script>

<svelte:head>
	<title>{$page.data.title || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 pb-24">
	<slot />
	<div class="fixed translate-x-[-50%] left-1/2 bottom-12">
		<RoundButton src={CloseIcon} alt="Close" action={navigateHome} class="drop-shadow-md" size="md" />
	</div>
</div>
