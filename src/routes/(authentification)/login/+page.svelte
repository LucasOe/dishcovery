<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { currentUser } from "$lib/functions/stores";
	import { fetchCurrentUserId, fetchUserData } from "$lib/functions/database/user";
	import LinkText from "$lib/components/LinkText.svelte";

	let email = "";
	let password = "";
	let error: AuthError;

	async function handleLogin() {
		// Sign in User
		const { data, error: auth_error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		//Fetch and set current user
		const userID = await fetchCurrentUserId();
		currentUser.set(await fetchUserData(userID));

		// Handle Redirect
		if (data.user) goto("/profile");
		if (auth_error) error = auth_error;
	}
</script>

<div class="flex flex-col">
	<form on:submit|preventDefault={handleLogin} class="flex flex-col gap-md">
		<Section title="E-Mail Adresse">
			<input
				bind:value={email}
				type="email"
				placeholder="bespiel@email.de"
				class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			/>
		</Section>
		<Section title="Passwort">
			<input
				bind:value={password}
				type="password"
				placeholder="Passwort"
				class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			/>
		</Section>
		<button
			type="submit"
			class="h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Login
		</button>
	</form>
	<div class=" flex flex-col gap-sm mt-8 justify-center items-center">
		<div class="flex flex-row items-center gap-xs">
			<span>Noch kein Mitglied</span>
			<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt Registrieren</LinkText>
		</div> 
		<LinkText link="/forgetpassword" title="Passwort vergessen">Passwort vergessen?</LinkText>
	</div>
	

	{#if error}
		<p class="text-red-500">{error.message}</p>
	{/if}
</div>
