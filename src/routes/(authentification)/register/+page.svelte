<script lang="ts">
	import { supabase } from "$lib/functions/database/createClient";
	import { userNameIsTaken, validateEmail, validatePassword, validateUsername } from "$lib/functions/validation";
	import type { AuthError } from "@supabase/supabase-js";
	import { goto } from "$app/navigation";

	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import Error from "$lib/components/Error.svelte";

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
					username.message = "";
				}}
				id="username"
				type="text"
				autocomplete="username"
				class="input peer"
				required
			/>
			{#if username.message !== ""}
				<FadeIn>
					<p class="error">
						{username.message}
					</p>
				</FadeIn>
			{:else}
				<Error visible={!username.isValid}>
					Nutzernamen müssen mindestens 8 Zeichen lang sein und dürfen keine Sonderzeichen enthalten.
				</Error>
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
				class="input peer"
				required
			/>
			<Error visible={!email.isValid}>Ungültige E-Mail-Adresse.</Error>
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
				class="input peer"
				required
			/>
			<Error visible={!password.isValid}>
				Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.
			</Error>
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
				class="input peer"
				required
			/>
			<Error visible={password.content !== password_repeat.content}>
				Diese Eingabe stimmt nicht mit dem Passwort überein.
			</Error>
		</Section>

		<div class="py-6">
			<button type="submit" class="button">Registrieren</button>
			{#if error}<FadeIn><p class="error">{error}</p></FadeIn>{/if}
		</div>
	</form>

	<div class="flex flex-col items-center justify-center gap-sm">
		<div class="flex flex-row items-center gap-xs">
			<span>Bereits Mitglied?</span>
			<LinkText link="/login" title="Login" textColor="text-yellow">Jetzt anmelden</LinkText>
		</div>
	</div>
</div>
