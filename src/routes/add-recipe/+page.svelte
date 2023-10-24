<script lang="ts">
	import UploadIcon from '../../assets/icons/upload.svg';
	import DifficultyIcon from '../../assets/icons/difficulty.svg';
	import DropDownIcon from '../../assets/icons/dropdown.svg';
	import ClockIcon from '../../assets/icons/clock.svg';
	import PriceIcon from '../../assets/icons/price.svg';
	import { onMount } from 'svelte';
	import PageTopBar from '$lib/components/PageTopBar.svelte';

	//Picture
	let preview: string | ArrayBuffer | null;
	let fileinput: HTMLInputElement;

	const onFileSelected = (event) => {
		let image = event.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	};

	//Kind
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

	//Categorie
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

	//Difficult
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

	//Time
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

	//Price
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

	//Worksteps

	let textFields: any[] = [];
	let nextTextFieldId = 0;

	function addTextField() {
		const newTextField = {
			id: nextTextFieldId++,
			value: ''
		};
		textFields = [...textFields, newTextField];
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
		<label class="block mb-1 text-xl font-semibold" id="app">Bilder</label>
		<div class="flex flex-row gap-2">
			<img
				class="upload inline w-10 h-10 drop-shadow-md"
				src={UploadIcon}
				alt=""
				on:click={() => {
					fileinput.click();
				}}
			/>
			<div
				class="chan"
				on:click={() => {
					fileinput.click();
				}}
			/>
			<input
				style="display:none"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onFileSelected(e)}
				bind:this={fileinput}
			/>
			<p class="mt-2.5">Bilder hochladen</p>
		</div>
	</div>
	<div>
		<label class="text-xl font-semibold">Preview</label>
		{#if preview}
			<img class="preview" src={preview} alt="d" />
		{:else}
			<img class="preview" src="" alt="" />
		{/if}
	</div>
	<!-- Kind -->
	<div>
		<label class="text-xl font-semibold">Art</label>
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
		<label class="text-xl font-semibold">Kategorie</label>
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
		<label class="text-xl font-semibold"
			><img
				alt="Difficulty"
				class="inline w-10 h-10 drop-shadow-md mr-4"
				src={DifficultyIcon}
			/>Schwierigkeit</label
		>
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
					<li class="cursor-pointer ml-5" on:click={() => selectDifficult(difficult)}>
						{difficult}
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
			<label class="text-xl font-semibold"
				><img alt="Time" class="inline w-10 h-10 drop-shadow-md mr-4" src={ClockIcon} />Zeit</label
			>
		</div>
		<div>
			<label class="text-xl font-semibold"
				><img
					alt="Price"
					class="inline w-10 h-10 drop-shadow-md mr-4"
					src={PriceIcon}
				/>Preis</label
			>
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
						<li class="cursor-pointer ml-5" on:click={() => selectTime(time)}>
							{time}
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
						<li class="cursor-pointer ml-5" on:click={() => selectPrice(price)}>
							{price}
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
		<label class="block mb-1 text-xl font-semibold">Zutaten</label>
		<div class="flex flex-row gap-2">
			<button class="upload-btn"
				><img alt="Close" class="inline w-10 h-10 drop-shadow-md" src={UploadIcon} /></button
			>
		</div>
	</div>

	<!-- Worksteps -->
	<div>
		<label class="block mb-1 text-xl font-semibold">Arbeitsschritte</label>
		<div class="relative">
			<label class="block mb-1 text-xl font-semibold text-[#FFC532]">1.Schritt</label>
			<input
				type="text"
				class="text-white text-xl h-60 w-full rounded-sm bg-gray-800 focus:outline-none"
				style="background-color: #2A2A2A;"
				placeholder="Hier eingeben..."
			/>
		</div>

		<div class="relative">
			{#each textFields as textField, index (textField.id)}
				<div>
					<label class="block mb-1 text-xl font-semibold text-[#FFC532]">{index + 2}. Schritt</label
					>
					<input
						type="text"
						class="text-white text-xl h-60 w-full rounded-sm bg-gray-800 focus:outline-none"
						style="background-color: #2A2A2A;"
						placeholder="Hier eingeben..."
						bind:value={textField.value}
					/>
				</div>
			{/each}
		</div>
		<div>
			<button on:click={addTextField}
				><img alt="Close" class="inline w-10 h-10 drop-shadow-md mt-4" src={UploadIcon} /></button
			>
		</div>
	</div>
	<div>
		<label class="block mb-1 text-xl font-semibold">Beschreibung (optional)</label>
		<input
			type="text"
			class="text-white text-xl h-60 w-full rounded-sm bg-gray-800 focus:outline-none"
			style="background-color: #2A2A2A;"
			placeholder="Hier eingeben..."
		/>
	</div>
	<div>
		<button class="text-xl font-semibold w-full h-16 bg-[#FFC532] rounded-sm text-[#212121]"
			>Rezept veröffentlichen</button
		>
	</div>
</div>
