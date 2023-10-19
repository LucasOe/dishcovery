<script>

	import H1 from "../../components/H1.svelte";
	import CloseIcon from '../../assets/icons/cancel.svg';
	import PictureUploadIcon from '../../assets/icons/pictureupload.svg';
	import Tag from "../../components/Tag.svelte";

</script>
<svelte:head>
	<title>Add Recipe</title>
	<meta name="description" content="Add Recipe" />
</svelte:head>
<div class="space-y-4">
	<div class="flex justify-between">
		<H1 text="Recipe Name" />
		<a href={'/'} class=""><img alt="Close" class="w-10 h-10 drop-shadow-md" src={CloseIcon} /></a>
	</div>

	<div>
		<div>
			<label for="title" class="block mb-1 text-xl text-white">Titel</label>
			<input type="text" id="title" class=" text-white text-xl h-10 w-full rounded-sm" style="background-color: #2A2A2A;">
		</div>
	</div>

	<div>
		<label class="text-xl">Bilder</label>
	</div>
	<div class="flex flex-row gap-2">
		<img alt="Close" class="inline w-10 h-10 drop-shadow-md" src={PictureUploadIcon} />
		<p class="mt-2.5">Bilder hochladen</p>
	</div>
	<div>
		<label class="text-xl">Preview</label>
	</div>
</div>
	
	