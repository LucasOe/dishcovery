<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { previousPage } from "$lib/functions/stores";

	import RoundButton from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";
</script>

<svelte:head>
	<title>{`${$page.data.title} - Dishcovery` || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 p-12 pb-36">
	<div class="flex items-center justify-between">
		<h1 class="font-header text-xxl text-light">{$page.data.title || "Page Title"}</h1>
	</div>

	<slot />
	<div class="fixed bottom-12 left-1/2 z-10 translate-x-[-50%]">
		<RoundButton
			src={CloseIcon}
			alt="Close"
			action={() => {
				$previousPage.pop();
				goto($previousPage.pop() || "/");
			}}
			class="drop-shadow-md"
			size="md"
		/>
	</div>
</div>
