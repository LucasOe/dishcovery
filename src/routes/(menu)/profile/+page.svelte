<script lang="ts">
	import img from "$lib/assets/img/test-img.jpg";
	import edit from "$lib/assets/icons/edit.svg";
	import Tag from "$lib/components/Tag.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import { supabase } from "$lib/functions/createClient";
	import { goto } from "$app/navigation";
	import Spinner from "$lib/components/Spinner.svelte";
	import {currentUser} from "$lib/functions/stores";

	let user;

	currentUser.subscribe((value) => {
		user = value;
	});

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		currentUser.set(null)
		if (error) console.log("Error logging out:", error.message);
		else goto("/");
	};
</script>

<FadeIn>
	<div class="text-column flex flex-col items-center justify-center">
		{#if user}
			<img class="w-44 rounded-full" alt="User" src={user.avatar_url} width="176" height="176" />
			<div class="mt-lg flex w-full flex-col items-center">
				<h1 class="block h-xl w-full text-center font-header text-xxl text-light">
					{user.username}
				</h1>
				<p class="hidden">25, Hamburg (DE)</p>
			</div>
			<div class="flex justify-center items-center gap-5">
				<div class="mt-lg flex font-bold text-gray-300">
					<img class="mr-5 size-5" alt="User" src={edit} />
					<p>Profil bearbeiten</p>
				</div>
				<button on:click={() => logout()} class="mt-lg flex font-bold text-gray-300">Ausloggen</button>
			</div>
			<div class="mt-lg flex gap-2 hidden">
				<div class="flex flex-col items-center border-r-2 border-gray-300 px-lg">
					<p class="font-bold">Rezepte</p>
					<p class="text-lg font-bold">3</p>
					<span class="block h-full w-2 bg-gray-300"></span>
				</div>
				<div class="flex flex-col items-center border-r-2 border-gray-300 px-lg">
					<p class="font-bold">Follower</p>
					<p class="text-lg font-bold">14</p>
				</div>
				<div class="flex flex-col items-center px-lg">
					<p class="font-bold">Following</p>
					<p class="text-lg font-bold">31</p>
				</div>
			</div>
			<div class="mt-lg flex gap-md">
				<Tag text="Vegan" />
				<Tag text="Vegetarisch" />
				<Tag text="Thailändisch" />
				<Tag text="Chinesisch" />
				<Tag text="Schnell" />
			</div>

			<div class="my-lg grid grid-cols-2 gap-5">
				<img class="w-44 rounded-md" alt="User" src={img} />
				<img class="w-44 rounded-md" alt="User" src={img} />
				<img class="w-44 rounded-md" alt="User" src={img} />
				<img class="w-44 rounded-md" alt="User" src={img} />
				<img class="w-44 rounded-md" alt="User" src={img} />
				<img class="w-44 rounded-md" alt="User" src={img} />
			</div>
		{:else}
			<Spinner />
		{/if}
	</div>
</FadeIn>
