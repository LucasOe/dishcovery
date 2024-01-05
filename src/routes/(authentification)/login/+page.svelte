<script lang="ts">
	import { supabase } from "$lib/functions/createClient";
	import { goto } from "$app/navigation";
	import Section from "$lib/components/Section.svelte";
  
	let email = "";
	let password = "";
	let error: any = null;
  
	async function handleLogin() {
	  const { data, error: authError } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	  });
  
	  if (data && data.user) {
		goto("/profile");
	  } else {
		error = authError;
		console.error(authError);
	  }
	}
</script>

<div class="flex flex-col space-y-lg">
	<form class="loginForm" on:submit|preventDefault={handleLogin}>
		<Section title="E-Mail Adresse">
			<input class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none" type="email" bind:value={email} placeholder="email@email.com" />
		</Section>
		<Section title="Passwort">
			<input class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none" type="password" bind:value={password} placeholder="Password" />
		</Section>
		<button class="h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow" type="submit">
			Login
		</button>
	</form>
	<a href="/register">Not a Member? Sign up!</a>

	{#if error}
		<p class="text-red-500">{error.message}</p>
	{/if}
</div>
