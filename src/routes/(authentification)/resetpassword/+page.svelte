<script lang="ts">
	import { goto } from "$app/navigation";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { validatePassword } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import type { AuthError } from "@supabase/supabase-js";

	let error: AuthError | null;
	let successMessage: string | null;
	let password = { content: "", isValid: true };
	let password_repeat = { content: "", isValid: true };

	async function handleReset() {
		if (!password.isValid) return;
		if (!password_repeat.isValid) return;

		const { error: reset_error } = await supabase.auth.updateUser({ password: password.content });

		if (reset_error) {
			error = reset_error;
		} else {
			successMessage = "Passwort erfolgreich zurückgesetzt. Du kannst dich jetzt anmelden.";
			goto("/login");
		}
	}
</script>

<div class="flex flex-col">
	<form on:submit|preventDefault={handleReset} class="flex flex-col gap-md">
		<Section title="Neues Passwort">
			<input
				bind:value={password.content}
				on:input={() => {
					password.isValid = validatePassword(password.content);
					error = null;
					successMessage = null;
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

		<Section title="Passwort bestätigen">
			<input
				bind:value={password_repeat.content}
				on:input={() => {
					error = null;
					successMessage = null;
				}}
				id="confirm_password"
				type="password"
				minlength="6"
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
			<button type="submit" class="button"> Passwort zurücksetzen </button>
			{#if error}
				<FadeIn>
					<p class="error">Fehler beim zurücksetzen des Passworts</p>
				</FadeIn>
			{:else if successMessage}
				<FadeIn>
					<p class="success">{successMessage}</p>
				</FadeIn>
			{/if}
		</div>
	</form>
</div>
