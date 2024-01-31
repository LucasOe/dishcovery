<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import { userNameIsTaken, validateEmail, validatePassword, validateUsername } from "$lib/functions/validation";
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
		if (await userNameIsTaken(username.content)) {
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
				autocomplete="username"
				class="input"
				required
			/>
			{#if !username.isValid}
				<FadeIn>
					<p class="error">
						Nutzernamen müssen mindestens 8 Zeichen lang sein und dürfen keine Sonderzeichen enthalten.
					</p>
				</FadeIn>
			{/if}
			{#if username.message !== ""}
				<FadeIn>
					<p class="error">
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
				autocomplete="email"
				class="input"
				required
			/>
			{#if !email.isValid}
				<FadeIn>
					<p class="error">Ungültige E-Mail-Adresse</p>
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
				autocomplete="new-password"
				class="input"
				required
			/>
			{#if !password.isValid}
				<FadeIn>
					<p class="error">Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.</p>
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
				autocomplete="new-password"
				class="input"
				required
			/>
			{#if password.content !== password_repeat.content}
				<FadeIn>
					<p class="error">Diese Eingabe stimmt nicht mit dem Passwort überein.</p>
				</FadeIn>
			{/if}
		</Section>

		<div class="py-6">
			<button type="submit" class="button">Registrieren</button>
			{#if error}
				<FadeIn>
					<p class="error">Anmeldung erfordert ein gültiges Passwort</p>
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
