<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { supabase } from "$lib/functions/createClient";
	import Section from "$lib/components/Section.svelte";

	let email = "";
	let password = "";
	let error: AuthError;

	async function handleLogin() {
		const { data, error: auth_error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (data.user) goto("/profile");
		if (auth_error) error = auth_error;
	}
</script>

<div class="flex flex-col space-y-lg">
	<form on:submit|preventDefault={handleLogin}>
		<Section title="E-Mail Adresse">
			<input
				bind:value={email}
				type="email"
				placeholder="email@email.com"
				class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			/>
		</Section>
		<Section title="Passwort">
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			/>
		</Section>
		<button
			type="submit"
			class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Login
		</button>
	</form>
	<a href="/register">Not a Member? Sign up!</a>
	<a href="/forgetpassword">Forget Password? Reset it here!</a>

	{#if error}
		<p class="text-red-500">{error.message}</p>
	{/if}
</div>
