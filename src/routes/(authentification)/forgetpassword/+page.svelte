<script lang="ts">
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { validateEmail } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import type { AuthError } from "@supabase/supabase-js";

	let error: AuthError | null = null;
	let email = { content: "", isValid: true };
	let successMessage: string | null;

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
				class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
				required
			/>
			{#if !email.isValid}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Ungültige E-Mail-Adresse</p>
				</FadeIn>
			{/if}
		</Section>

		<button
			type="submit"
			class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Passwort zurücksetzen
		</button>
		{#if error}
			<FadeIn>
				<p class="mt-2 rounded-sm bg-red p-2">{error}</p>
			</FadeIn>
		{:else if successMessage}
			<FadeIn>
				<p class="mt-2 rounded-sm text-yellow">{successMessage}</p>
			</FadeIn>
		{/if}
	</form>
</div>
