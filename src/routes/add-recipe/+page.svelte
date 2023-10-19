<script>

	import H1 from "../../components/H1.svelte";
	import CloseIcon from '../../assets/icons/cancel.svg';
	import PictureUploadIcon from '../../assets/icons/pictureupload.svg';

	let buttons = [
    { text: 'Button 1', borderColor: 'red' },
    { text: 'Button 2', borderColor: 'green' },
    { text: 'Button 3', borderColor: 'blue' }
  ];

  function changeBorderColor(index) {
    if (buttons[index].borderColor === 'red') {
      buttons[index].borderColor = 'purple'; // Change to purple
    } else {
      buttons[index].borderColor = 'red'; // Change back to red
    }
  }
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
			<label for="title" class="block mb-1 text-xl font-semibold">Titel</label>
			<input type="text" id="title" class=" text-white text-xl h-10 w-full rounded-sm" style="background-color: #2A2A2A;">
		</div>
	</div>

	<div>
		<label class="block mb-1 text-xl font-semibold">Bilder</label>
		<div class="flex flex-row gap-2">
			<button class="upload-btn"><img alt="Close" class="inline w-10 h-10 drop-shadow-md" src={PictureUploadIcon}/></button>
			<p class="mt-2.5">Bilder hochladen</p>
		</div>
	</div>
	<div>
		<label class="text-xl font-semibold">Preview</label>
	</div>
	<div>
		<label class="text-xl font-semibold">Art</label>
		<div class="button-box" style="background-color: #2A2A2A;">
			<div class="buttons">
				{#each buttons as button, index (button.text)}
  				<button
    			style="padding: 10px; margin: 5px; border: 2px solid {button.borderColor}; border-radius: 5px; cursor: pointer;"
    on:click={() => changeBorderColor(index)}
  >
    {button.text}
  </button>
{/each}
			</div>
		  </div>
		  
	</div>
</div>
	