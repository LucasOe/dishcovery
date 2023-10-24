<script>
	import RoundBtn from './RoundBtn.svelte';
	import H1 from './H1.svelte';
	import CloseIcon from '../assets/icons/cancel.svg';
	/**
	 * @type {string}
	 */
	export let header;
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
