<script lang="ts">
	import RoundBtn from '$lib/components/RoundButton.svelte';
	import H1 from '$lib/components/H1.svelte';
	import CloseIcon from '$lib/assets/icons/cancel.svg';

	export let header: string;
</script>

<div class="flex justify-between">
	<H1 text={header} />
	<RoundBtn
		src={CloseIcon}
		alt="Close"
		link={'/'}
		padding={1}
		icWidth={1}
		additionalClasses="drop-shadow-md"
	/>
</div>
