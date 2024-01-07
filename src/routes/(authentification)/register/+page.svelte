<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { supabase } from "$lib/functions/createClient";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";

	let username: string;
	let email: string;
	let password: string;
	let password_repeat: string;
	let error: AuthError;

	async function handleRegister() {
		if (password !== password_repeat) return;

		const { data, error: auth_error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (data.user) goto("/profile");
		if (auth_error) error = auth_error;
	}
</script>

<div class="flex flex-col space-y-lg">
	<Section title="Benutzername">
		<input
			bind:value={username}
			id="username"
			type="text"
			class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
	</Section>
	<Section title="E-Mail Adresse">
		<input
			bind:value={email}
			id="email"
			type="email"
			class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
	</Section>
	<Section title="Passwort">
		<input
			bind:value={password}
			id="password"
			type="password"
			minlength="6"
			class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
	</Section>
	<Section title="Passwort wiederholen">
		<input
			bind:value={password_repeat}
			id="password_repeat"
			type="password"
			minlength="6"
			class="text-white h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
	</Section>

	<button
		on:click={handleRegister}
		class="h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
	>
		Registrieren
	</button>

	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<span>Bereits Mitglied?</span>
			<LinkText link="/login" title="Login" textColor="text-yellow">Jetzt anmelden</LinkText>
		</div>
		<LinkText link="/" title="Als Gast beitreten">Als Gast beitreten</LinkText>
	</div>

	{#if error}
		<p class="text-red-500">{error.message}</p>
	{/if}
</div>
