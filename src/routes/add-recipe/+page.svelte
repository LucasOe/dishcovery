<script>

	import H1 from "../../components/H1.svelte";
	import CloseIcon from '../../assets/icons/cancel.svg';

</script>
<svelte:head>
	<title>Add Recipe</title>
	<meta name="description" content="Add Recipe" />
</svelte:head>

<div class="flex justify-between">
	<H1 text="Recipe Name" />
	<a href={'/'} class=""><img alt="Close" class="w-10 h-10" src={CloseIcon} /></a>
</div>
