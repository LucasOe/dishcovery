<script>
	import img from '../../assets/img/test-img.jpg';
	import edit from '../../assets/icons/edit.svg';
	import H1 from '../../components/H1.svelte';
	import Tag from '../../components/Tag.svelte';
	import PageTopBar from '../../components/PageTopBar.svelte';
</script>

<svelte:head>
	<title>Profil</title>
	<meta name="description" content="Profil" />
</svelte:head>
<PageTopBar header="Kochbuch" />

<div class="text-column flex justify-center flex-col items-center">
	<img class="rounded-full w-44" alt="User" src={img} />
	<div class="mt-lg flex flex-col items-center">
		<H1 text="Jennifer Hoffmann" />
		<p>25, Hamburg (DE)</p>
	</div>
	<div class="flex gap-2 mt-lg">
		<div class="flex flex-col items-center px-lg border-r-2 border-gray-300">
			<p class="font-bold">Rezepte</p>
			<p class="font-bold text-lg">3</p>
			<div class="block h-full w-2 bg-gray-300" />
		</div>
		<div class="flex flex-col items-center px-lg border-r-2 border-gray-300">
			<p class="font-bold">Follower</p>
			<p class="font-bold text-lg">14</p>
		</div>
		<div class="flex flex-col items-center px-lg">
			<p class="font-bold">Following</p>
			<p class="font-bold text-lg">31</p>
		</div>
	</div>
	<div class="flex gap-md mt-lg">
		<Tag>Vegan</Tag>
		<Tag>Vegetarisch</Tag>
		<Tag>Thailändisch</Tag>
		<Tag>Chinesisch</Tag>
		<Tag>Schnell</Tag>
	</div>
	<div class="flex text-gray-300 font-bold mt-lg">
		<img class="w-5 h-5 mr-5" alt="User" src={edit} />
		<p>Profil bearbeiten</p>
	</div>

	<div class="grid-cols-2 grid gap-5 my-lg">
		<img class="rounded-md w-44" alt="User" src={img} />
		<img class="rounded-md w-44" alt="User" src={img} />
		<img class="rounded-md w-44" alt="User" src={img} />
		<img class="rounded-md w-44" alt="User" src={img} />
		<img class="rounded-md w-44" alt="User" src={img} />
		<img class="rounded-md w-44" alt="User" src={img} />
	</div>
</div>
