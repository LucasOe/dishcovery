<script>
	import RoundBtn from '../components/RoundBtn.svelte';
	import H1 from '../components/H1.svelte';
	import CloseIcon from '../assets/icons/cancel.svg';
    /**
	 * @type {string}
	*/
    export let header;
</script>

<div class="flex justify-between">
    <H1 text={header} />
    <RoundBtn src={CloseIcon} alt="Close" link={'/'} padding={.5} icWidth={2} additionalClasses="drop-shadow-md" />
</div>