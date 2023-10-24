<script lang="ts">
	import { onMount } from 'svelte';

	import UploadIcon from '$lib/assets/icons/upload.svg';
	import DifficultyIcon from '$lib/assets/icons/difficulty.svg';
	import DropDownIcon from '$lib/assets/icons/dropdown.svg';
	import ClockIcon from '$lib/assets/icons/clock.svg';
	import PriceIcon from '$lib/assets/icons/price.svg';
	import PageTopBar from '$lib/components/PageTopBar.svelte';

	// Kind
	let buttons = [
		{ text: 'Frühstück', borderColor: '#7D7C7C' },
		{ text: 'Abendessen', borderColor: '#7D7C7C' },
		{ text: 'Snack', borderColor: '#7D7C7C' },
		{ text: 'Gebäck', borderColor: '#7D7C7C' },
		{ text: 'Cocktail', borderColor: '#7D7C7C' }
	];
	function changeBorderColor(index: number) {
		if (buttons[index].borderColor === '#7D7C7C') {
			buttons[index].borderColor = '#FFC532';
		} else {
			buttons[index].borderColor = '#7D7C7C';
		}
	}

	// Category
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

	function changeBorderColor2(index2: number) {
		if (buttons2[index2].borderColor === '#7D7C7C') {
			buttons2[index2].borderColor = '#FFC532';
		} else {
			buttons2[index2].borderColor = '#7D7C7C';
		}
	}

	// Difficulty
	let isOpenDifficult = false;
	let selectedDifficult: string | null = null;
	let difficults = ['leicht', 'mittel', 'schwer'];

	onMount(() => {
		selectedDifficult = difficults[0];
	});

	function toggleDropdownDifficult() {
		isOpenDifficult = !isOpenDifficult;
	}

	function selectDifficult(difficult: string) {
		selectedDifficult = difficult;
		isOpenDifficult = false;
	}

	// Time
	let isOpenTime = false;
	let selectedTime: string | null = null;
	let times = ['5 Min.', '10 Min.', '15 Min.', '20 Min.', '25 Min.', '30 Min.'];

	onMount(() => {
		selectedTime = times[0];
	});

	function toggleDropdownTime() {
		isOpenTime = !isOpenTime;
	}

	function selectTime(time: string) {
		selectedTime = time;
		isOpenTime = false;
	}

	// Price
	let isOpenPrice = false;
	let selectedPrice: string | null = null;
	let prices = ['€', '€€', '€€€'];

	onMount(() => {
		selectedPrice = prices[0];
	});

	function toggleDropdownPrice() {
		isOpenPrice = !isOpenPrice;
	}

	function selectPrice(price: string) {
		selectedPrice = price;
		isOpenPrice = false;
	}
</script>

<svelte:head>
	<title>Add Recipe</title>
	<meta name="description" content="Add Recipe" />
</svelte:head>
<div class="space-y-4">
	<PageTopBar header="Neues Rezept" />

	<div>
		<div>
			<label for="title" class="block mb-1 text-xl font-semibold">Titel</label>
			<input
				type="text"
				id="title"
				class=" text-white text-xl h-10 w-full rounded-sm bg-[#2A2A2A]"
			/>
		</div>
	</div>
	<!-- pictures -->
	<div id="app">
		<p class="block mb-1 text-xl font-semibold" id="app">Bilder</p>
		<div class="flex flex-row gap-2">
			<button>
				<img class="upload inline w-10 h-10 drop-shadow-md" src={UploadIcon} alt="" />
			</button>
			<button class="chan" />
			<input style="display:none" type="file" accept=".jpg, .jpeg, .png" />
			<p class="mt-2.5">Bilder hochladen</p>
		</div>
	</div>
	<div>
		<p class="text-xl font-semibold">Preview</p>
		<img class="preview" src="" alt="" />
	</div>
	<!-- Kind -->
	<div>
		<p class="text-xl font-semibold">Art</p>
		<div class="button-box rounded-sm mt-2 bg-[#363636]">
			<div class="buttons text-left">
				{#each buttons as button, index (button.text)}
					<button
						class="m-2 p-2 rounded-sm"
						style="border: 2px solid {button.borderColor}"
						on:click={() => changeBorderColor(index)}
					>
						{button.text}
					</button>
				{/each}
			</div>
		</div>
	</div>
	<!-- Category -->
	<div>
		<p class="text-xl font-semibold">Kategorie</p>
		<div class="button-box rounded-sm mt-2 bg-[#363636]">
			<div class="buttons text-left">
				{#each buttons2 as button, index2 (button.text)}
					<button
						class="m-2 p-2 rounded-sm"
						style="border: 2px solid {button.borderColor}"
						on:click={() => changeBorderColor2(index2)}
					>
						{button.text}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Difficulty -->
	<div class="flex flex-row gap-2">
		<p class="text-xl font-semibold">
			<img alt="Difficulty" class="inline w-10 h-10 drop-shadow-md mr-4" src={DifficultyIcon} />
			Schwierigkeit
		</p>
	</div>

	<div class="col-span-2">
		<div class="relative h-10 rounded-sm shadow-md bg-[#2A2A2A]">
			<button class="text-xl m-2 font-semibold rounded-md" on:click={toggleDropdownDifficult}>
				{selectedDifficult}
			</button>

			<ul
				class="absolute text-xl font-semibold rounded-md bg-[#2A2A2A] w-full overflow-y-auto z-10 shadow-md"
				style="display: {isOpenDifficult ? 'block' : 'none'}"
			>
				{#each difficults as difficult (difficult)}
					<li class="cursor-pointer ml-5">
						<button on:click={() => selectDifficult(difficult)}>{difficult}</button>
					</li>
				{/each}
			</ul>

			<button class="absolute top-0 right-0" on:click={toggleDropdownDifficult}
				><img alt="Dropdown" class="inline w-10 h-10 drop-shadow-md" src={DropDownIcon} /></button
			>
		</div>
	</div>

	<!-- Time and Price -->
	<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-1 relative">
		<div class="col-span-2">
			<p class="text-xl font-semibold">
				<img alt="Time" class="inline w-10 h-10 drop-shadow-md mr-4" src={ClockIcon} />
				Zeit
			</p>
		</div>
		<div>
			<p class="text-xl font-semibold">
				<img alt="Price" class="inline w-10 h-10 drop-shadow-md mr-4" src={PriceIcon} />
				Preis
			</p>
		</div>
	</div>

	<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-1">
		<!-- Time -->
		<div class="col-span-2">
			<div class="relative h-10 rounded-sm shadow-md bg-[#2A2A2A] mr-5">
				<button class="text-xl m-2 font-semibold rounded-md" on:click={toggleDropdownTime}>
					{selectedTime}
				</button>

				<ul
					class="absolute text-xl font-semibold rounded-md bg-[#2A2A2A] h-20 w-full overflow-y-auto z-10"
					style="display: {isOpenTime ? 'block' : 'none'}"
				>
					{#each times as time (time)}
						<li class="cursor-pointer ml-5">
							<button on:click={() => selectTime(time)}>{time}</button>
						</li>
					{/each}
				</ul>

				<button class="absolute top-0 right-0" on:click={toggleDropdownTime}
					><img alt="Dropdown" class="inline w-10 h-10 drop-shadow-md" src={DropDownIcon} /></button
				>
			</div>
		</div>

		<!-- Price -->
		<div>
			<div class="relative h-10 rounded-sm shadow-md bg-[#2A2A2A]">
				<button class="text-xl m-2 font-semibold rounded-md" on:click={toggleDropdownPrice}>
					{selectedPrice}
				</button>

				<ul
					class="absolute text-xl font-semibold rounded-md bg-[#2A2A2A] w-full overflow-y-auto z-10"
					style="display: {isOpenPrice ? 'block' : 'none'}"
				>
					{#each prices as price (price)}
						<li class="cursor-pointer ml-5">
							<button on:click={() => selectPrice(price)}>{price}</button>
						</li>
					{/each}
				</ul>

				<button class="absolute top-0 right-0" on:click={toggleDropdownPrice}
					><img alt="Dropdown" class="inline w-10 h-10 drop-shadow-md" src={DropDownIcon} /></button
				>
			</div>
		</div>
	</div>
	<!-- Ingredients -->
	<div>
		<p class="block mb-1 text-xl font-semibold">Zutaten</p>
		<div class="flex flex-row gap-2">
			<button class="upload-btn"
				><img alt="Close" class="inline w-10 h-10 drop-shadow-md" src={UploadIcon} /></button
			>
		</div>
	</div>

	<!-- Worksteps -->
	<div>
		<p class="block mb-1 text-xl font-semibold">Arbeitsschritte</p>
		<div class="relative">
			<p class="block mb-1 text-xl font-semibold text-[#FFC532]">1.Schritt</p>
			<input
				type="text"
				class="text-white text-xl h-60 w-full rounded-sm bg-gray-800 focus:outline-none"
				style="background-color: #2A2A2A;"
				placeholder="Hier eingeben..."
			/>
		</div>
		<div>
			<img alt="Close" class="inline w-10 h-10 drop-shadow-md mt-4" src={UploadIcon} />
		</div>
	</div>
	<div>
		<p class="block mb-1 text-xl font-semibold">Beschreibung (optional)</p>
		<input
			type="text"
			class="text-white text-xl h-60 w-full rounded-sm bg-gray-800 focus:outline-none"
			style="background-color: #2A2A2A;"
			placeholder="Hier eingeben..."
		/>
	</div>
	<div>
		<button class="text-xl font-semibold w-full h-16 bg-[#FFC532] rounded-sm text-[#212121]">
			Rezept veröffentlichen
		</button>
	</div>
</div>
