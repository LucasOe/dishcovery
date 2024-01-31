<script lang="ts">
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { validateEmail } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import type { AuthError } from "@supabase/supabase-js";

	let error: AuthError | null = null;
	let successMessage: string | null;
	let email = { content: "", isValid: true };

	async function handleForgotPassword() {
		if (!email.isValid) return;

		const { error: reset_error } = await supabase.auth.resetPasswordForEmail(email.content, {
			redirectTo: `${window.location.origin}/resetpassword`,
		});

		if (reset_error) {
			error = reset_error;
		} else {
			successMessage = "Passwort-Wiederherstellungs-E-Mail wurde gesendet. Bitte überprüfe dein E-Mail-Postfach.";
		}
	}
</script>

<div class="flex flex-col space-y-lg">
	<form on:submit|preventDefault={handleForgotPassword}>
		<Section title="E-Mail-Adresse">
			<input
				bind:value={email.content}
				on:input={() => {
					email.isValid = validateEmail(email.content);
					error = null;
					successMessage = null;
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

		<div class="py-6">
			<button type="submit" class="button">Passwort zurücksetzen</button>
			{#if error}
				<FadeIn>
					<p class="error">{error}</p>
				</FadeIn>
			{:else if successMessage}
				<FadeIn>
					<p class="success">{successMessage}</p>
				</FadeIn>
			{/if}
		</div>
	</form>
</div>
