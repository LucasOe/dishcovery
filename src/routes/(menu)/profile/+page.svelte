<script lang="ts">
	import img from "$lib/assets/img/test-img.jpg";
	import edit from "$lib/assets/icons/edit.svg";
	import Tag from "$lib/components/Tag.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import {supabase} from "$lib/functions/createClient";
	import {onMount} from "svelte";
	import LoadingContent from "$lib/components/LoadingContent.svelte";

	let userData;
	let userLoaded = false;

	onMount(async () => {
				const { data, error } = await supabase.auth.refreshSession()
				const { session, user } = data
				userData = user
				userLoaded = true;
			}
	)
</script>

<FadeIn>
	<div class="text-column flex flex-col items-center justify-center">
		<img class="w-44 rounded-full" alt="User" src={img} width="176" height="176" />
		<div class="mt-lg flex flex-col items-center w-full">
				<h1 class="font-header text-xxl h-xl w-full text-light text-center block">
					{#if userLoaded}
						{userData.user_metadata.username}
					{:else}
						<LoadingContent/>
					{/if}
				</h1>
			<p>25, Hamburg (DE)</p>
		</div>
		<div class="mt-lg flex gap-2">
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
		<div class="mt-lg flex font-bold text-gray-300">
			<img class="mr-5 size-5" alt="User" src={edit} />
			<p>Profil bearbeiten</p>
		</div>

		<div class="my-lg grid grid-cols-2 gap-5">
			<img class="w-44 rounded-md" alt="User" src={img} />
			<img class="w-44 rounded-md" alt="User" src={img} />
			<img class="w-44 rounded-md" alt="User" src={img} />
			<img class="w-44 rounded-md" alt="User" src={img} />
			<img class="w-44 rounded-md" alt="User" src={img} />
			<img class="w-44 rounded-md" alt="User" src={img} />
		</div>
	</div>
</FadeIn>
