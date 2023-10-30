<script lang="ts">
	import { onMount } from "svelte";

	import UploadIcon from "$lib/assets/icons/upload.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import DropDownIcon from "$lib/assets/icons/dropdown.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";

	// Difficulty
	let isOpenDifficult = false;
	let selectedDifficult: string | null = null;
	let difficults = ["leicht", "mittel", "schwer"];

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
	let times = ["5 Min.", "10 Min.", "15 Min.", "20 Min.", "25 Min.", "30 Min."];

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
	let prices = ["€", "€€", "€€€"];

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

<div class="space-y-lg">
	<Section title="Titel">
		<input type="text" id="title" class=" text-white h-10 w-full rounded-sm bg-[#2A2A2A] text-xl" />
	</Section>

	<Section title="Beschreibung">
		<textarea
			class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl focus:outline-none"
			placeholder="Hier eingeben..."
		/>
	</Section>

	<Section title="Bilder">
		<div class="flex items-center gap-2">
			<img class="h-10 w-10" src={UploadIcon} alt="" />
			<p>Bild hinzufügen</p>
		</div>
	</Section>

	<Section title="Art">
		<TagList tags={["Frühstück", "Abendessen", "Snack", "Gebäck", "Cocktail"]} />
	</Section>

	<Section title="Kategorie">
		<TagList
			tags={["Vegetarisch", "Vegan", "Pizza", "Ohne Nüsse", "Burger", "Herzhaft", "Wenig Zutaten", "Salat", "Schnell"]}
		/>
	</Section>

	<Section title="Schwierigkeit" icon={DifficultyIcon}>
		<div class="relative h-10 rounded-sm bg-[#2A2A2A] shadow-md">
			<button class="m-2 rounded-md text-xl font-semibold" on:click={toggleDropdownDifficult}>
				{selectedDifficult}
			</button>

			<ul
				class="absolute z-10 w-full overflow-y-auto rounded-md bg-[#2A2A2A] text-xl font-semibold shadow-md"
				style="display: {isOpenDifficult ? 'block' : 'none'}"
			>
				{#each difficults as difficult (difficult)}
					<li class="ml-5 cursor-pointer">
						<button on:click={() => selectDifficult(difficult)}>{difficult}</button>
					</li>
				{/each}
			</ul>

			<button class="absolute right-0 top-0" on:click={toggleDropdownDifficult}>
				<img alt="Dropdown" class="h-10 w-10" src={DropDownIcon} />
			</button>
		</div>
	</Section>

	<Section title="Zeit" icon={ClockIcon}>
		<div class="relative h-10 rounded-sm bg-[#2A2A2A] shadow-md">
			<button class="m-2 rounded-md text-xl font-semibold" on:click={toggleDropdownTime}>
				{selectedTime}
			</button>

			<ul
				class="absolute z-10 h-20 w-full overflow-y-auto rounded-md bg-[#2A2A2A] text-xl font-semibold"
				style="display: {isOpenTime ? 'block' : 'none'}"
			>
				{#each times as time (time)}
					<li class="ml-5 cursor-pointer">
						<button on:click={() => selectTime(time)}>{time}</button>
					</li>
				{/each}
			</ul>

			<button class="absolute right-0 top-0" on:click={toggleDropdownTime}>
				<img alt="Dropdown" class="h-10 w-10" src={DropDownIcon} />
			</button>
		</div>
	</Section>

	<Section title="Preis" icon={PriceIcon}>
		<div class="relative h-10 rounded-sm bg-[#2A2A2A] shadow-md">
			<button class="m-2 rounded-md text-xl font-semibold" on:click={toggleDropdownPrice}>
				{selectedPrice}
			</button>

			<ul
				class="absolute z-10 w-full overflow-y-auto rounded-md bg-[#2A2A2A] text-xl font-semibold"
				style="display: {isOpenPrice ? 'block' : 'none'}"
			>
				{#each prices as price (price)}
					<li class="ml-5 cursor-pointer">
						<button on:click={() => selectPrice(price)}>{price}</button>
					</li>
				{/each}
			</ul>

			<button class="absolute right-0 top-0" on:click={toggleDropdownPrice}>
				<img alt="Dropdown" class="h-10 w-10" src={DropDownIcon} />
			</button>
		</div>
	</Section>

	<Section title="Zutaten">
		<div class="flex items-center gap-2">
			<img class="h-10 w-10" src={UploadIcon} alt="" />
			<p>Zutat hinzufügen</p>
		</div>
	</Section>

	<!-- Worksteps -->

	<Section title="Arbeitsschritte">
		<div class="space-y-sm">
			<p class=" block text-xl font-semibold text-[#FFC532]">1.Schritt</p>
			<textarea
				class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl focus:outline-none"
				placeholder="Hier eingeben..."
			/>
			<img alt="Close" class="h-10 w-10" src={UploadIcon} />
		</div>
	</Section>

	<button class="h-16 w-full rounded-sm bg-[#FFC532] text-xl font-semibold text-[#212121]">
		Rezept veröffentlichen
	</button>
</div>
