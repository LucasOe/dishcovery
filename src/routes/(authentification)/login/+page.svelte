<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { validateEmail, validatePassword } from "$lib/functions/validation";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let email = {
		content: "",
		isValid: true,
	};
	let password = {
		content: "",
		isValid: true,
	};
	let error: AuthError | null = null;

	let inputs = [email, password];
	let isFormValid = true;

	async function handleLogin() {
		for (let input of inputs) {
			if (!input.isValid) {
				isFormValid = false;
				return;
			}
		}
		try {
			const { data, error: auth_error } = await supabase.auth.signInWithPassword({
				email: email.content,
				password: password.content,
			});

			if (data && data.user) {
				goto("/");
			} else if (auth_error) {
				throw auth_error;
			}
		} catch (e) {
			error = e as AuthError;
			setTimeout(() => {
				error = null;
			}, 3000);
		}
	}
</script>

<div class="flex flex-col">
	<form on:submit|preventDefault={handleLogin} class="flex flex-col gap-md">
		<Section title="E-Mail-Adresse">
			<input
				bind:value={email.content}
				on:input={() => (email.isValid = validateEmail(email.content))}
				id="email"
				type="email"
				class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
				required
			/>
			{#if !email.isValid}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Ungültige E-Mail-Adresse</p>
				</FadeIn>
			{/if}
		</Section>
		<Section title="Passwort">
			<input
				bind:value={password.content}
				on:input={() => (password.isValid = validatePassword(password.content))}
				id="password"
				type="password"
				minlength="6"
				class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
				required
			/>
			{#if !password.isValid}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">
						Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.
					</p>
				</FadeIn>
			{/if}
		</Section>
		<button
			type="submit"
			class="h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Login
		</button>
	</form>
	<div class=" mt-8 flex flex-col items-center justify-center gap-sm">
		<div class="flex flex-row items-center gap-xs">
			<span>Noch kein Mitglied</span>
			<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt Registrieren</LinkText>
		</div>
		<LinkText link="/forgetpassword" title="Passwort vergessen">Passwort vergessen?</LinkText>
	</div>

	{#if error}
		<p class="text-red-500">
			{#if error.message.toLowerCase().includes("invalid login credentials")}
				Das Passwort oder die E-Mail-Adresse ist ungültig.
			{:else}
				Es ist ein Fehler aufgetreten: {error.message}
			{/if}
		</p>
	{/if}
</div>
