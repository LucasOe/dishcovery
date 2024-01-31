<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import { userNameisTaken, validateEmail, validatePassword, validateUsername } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let error: AuthError | null;
	let username = { content: "", isValid: true, message: "" };
	let email = { content: "", isValid: true };
	let password = { content: "", isValid: true };
	let password_repeat = { content: "", isValid: true };

	async function handleRegister() {
		if (!username.isValid) return;
		if (!email.isValid) return;
		if (!password.isValid) return;
		if (!password_repeat.isValid) return;

		// Check if the username is already taken
		if (await userNameisTaken(username.content)) {
			username.message = "Der Benutzername wird bereits verwendet.";
			return;
		}

		const { error: auth_error } = await supabase.auth.signUp({
			email: email.content,
			password: password.content,
			options: {
				data: {
					username: username.content,
					avatar_url: null,
				},
			},
		});

		if (auth_error) {
			error = auth_error;
		} else {
			goto("/register_success");
		}
	}
</script>

<div class="flex flex-col">
	<form on:submit|preventDefault={handleRegister} class="flex flex-col gap-md">
		<Section title="Benutzername">
			<input
				bind:value={username.content}
				on:input={() => {
					username.isValid = validateUsername(username.content);
					error = null;
				}}
				id="username"
				type="text"
				class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
				required
			/>
			{#if !username.isValid}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">
						Nutzernamen müssen mindestens 8 Zeichen lang sein und dürfen keine Sonderzeichen enthalten.
					</p>
				</FadeIn>
			{/if}
			{#if username.message !== ""}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">
						{username.message}
					</p>
				</FadeIn>
			{/if}
		</Section>

		<Section title="E-Mail-Adresse">
			<input
				bind:value={email.content}
				on:input={() => {
					email.isValid = validateEmail(email.content);
					error = null;
				}}
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
				on:input={() => {
					password.isValid = validatePassword(password.content);
					error = null;
				}}
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

		<Section title="Passwort wiederholen">
			<input
				bind:value={password_repeat.content}
				on:input={() => {
					error = null;
				}}
				id="password_repeat"
				type="password"
				minlength="8"
				class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
				required
			/>
			{#if password.content !== password_repeat.content}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Diese Eingabe stimmt nicht mit dem Passwort überein.</p>
				</FadeIn>
			{/if}
		</Section>

		<div class="my-8">
			<button
				type="submit"
				class="h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
			>
				Registrieren
			</button>
			{#if error}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Anmeldung erfordert ein gültiges Passwort</p>
				</FadeIn>
			{/if}
		</div>
	</form>

	<div class="flex flex-col items-center justify-center gap-sm">
		<div class="flex flex-row items-center gap-xs">
			<span>Bereits Mitglied?</span>
			<LinkText link="/login" title="Login" textColor="text-yellow">Jetzt anmelden</LinkText>
		</div>
	</div>
</div>
