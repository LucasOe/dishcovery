<script>

	import H1 from "../../components/H1.svelte";
	import CloseIcon from '../../assets/icons/cancel.svg';
	import PictureUploadIcon from '../../assets/icons/pictureupload.svg';
	import DifficultyIcon from '../../assets/icons/difficulty.svg';
	import DropDownIcon from '../../assets/icons/dropdown.svg';

	

	import { onMount } from "svelte";

let isOpen = false;
let selectedOption = null;
let options = ["Option 1", "Option 2", "Option 3"];

onMount(() => {
  // Set initial selection
  selectedOption = options[0];
});

function toggleDropdown() {
  isOpen = !isOpen;
}

function selectOption(option) {
  selectedOption = option;
  isOpen = false;
}

	
	
	

	let buttons = [
    { text: 'Frühstück', borderColor: '#7D7C7C' },
    { text: 'Abendessen', borderColor: '#7D7C7C' },
	{ text: 'Snack', borderColor: '#7D7C7C' },
	{ text: 'Gebäck', borderColor: '#7D7C7C' },
    { text: 'Cocktail', borderColor: '#7D7C7C' }
  ];
  function changeBorderColor(index) {
    if (buttons[index].borderColor === '#7D7C7C') {
      buttons[index].borderColor = '#FFC532'; 
    } else {
      buttons[index].borderColor = '#7D7C7C'; 
    }
  }

  let buttons2 = [
    { text: 'Vegetarisch', borderColor: '#7D7C7C' },
    { text: 'Vegan', borderColor: '#7D7C7C' },
	{ text: 'Pizza', borderColor: '#7D7C7C' },
	{ text: 'Ohne Nüsse', borderColor: '#7D7C7C' },
	{ text: 'Burger', borderColor: '#7D7C7C' },
    { text: 'Herzhaft', borderColor: '#7D7C7C' },
	{ text: 'Wenig Zutaten', borderColor: '#7D7C7C' },
	{ text: 'Salat', borderColor: '#7D7C7C' },
    { text: 'Schnell', borderColor: '#7D7C7C' }
  ];

  function changeBorderColor2(index2) {
    if (buttons2[index2].borderColor === '#7D7C7C') {
      buttons2[index2].borderColor = '#FFC532'; 
    } else {
      buttons2[index2].borderColor = '#7D7C7C'; 
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
			<div class="button-box rounded-sm mt-2" style="background-color: #363636;">
				<div class="buttons text-left">
					{#each buttons as button, index (button.text)}
  					<button class="m-2 p-2 rounded-sm"
    				style="border: 2px solid {button.borderColor}"
    				on:click={() => changeBorderColor(index)}
  					>
    				{button.text}
  					</button>
					{/each}
				</div>
		  	</div>
		</div>

		<div>
		  <label class="text-xl font-semibold">Kategorie</label>
			<div class="button-box rounded-sm mt-2" style="background-color: #363636;">
				<div class="buttons text-left">
					{#each buttons2 as button, index2 (button.text)}
  					<button class="m-2 p-2 rounded-sm"
    				style="border: 2px solid {button.borderColor}"
    				on:click={() => changeBorderColor2(index2)}
  					>
    				{button.text}
  					</button>
					{/each}
				</div>
		  	</div>
		</div>
	
		<div class="relative">
			<button
			  class="bg-blue-500 text-white px-4 py-2 rounded-md"
			  on:click={toggleDropdown}
			>
			  {selectedOption}
			</button>
		  
			<ul
			  class="absolute mt-10 py-2 bg-white border border-gray-300 rounded-md"
			  style="display: {isOpen ? 'block' : 'none'}"
			>
			  {#each options as option (option)}
				<li
				  class="cursor-pointer px-4 py-2 hover:bg-gray-100"
				  on:click={() => selectOption(option)}
				>
				  {option}
				</li>
			  {/each}
			</ul>
		  
			<button
			  class="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-0 right-0"
			  on:click={toggleDropdown}
			>
			  Toggle Menu
			</button>
		  </div>
		  
		  
		  
</div>



	