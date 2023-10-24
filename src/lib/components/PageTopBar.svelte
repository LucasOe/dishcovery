<script lang="ts">
	import RoundBtn from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";

	export let header: string;
</script>

<div class="flex justify-between">
	<h1 class="font-header text-fs-header text-light">{header}</h1>
	<RoundBtn src={CloseIcon} alt="Close" link={"/"} class="drop-shadow-md" size="md" />
</div>
