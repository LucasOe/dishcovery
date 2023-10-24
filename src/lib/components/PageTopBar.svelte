<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import CloseIcon from "$lib/assets/icons/cancel.svg";

	export let header: string;
</script>

<div class="flex justify-between">
	<h1 class="font-header text-fs-header text-light">{header}</h1>
	<RoundButton src={CloseIcon} alt="Close" link={"/"} class="drop-shadow-md" size="md" />
</div>
