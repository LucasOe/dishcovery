<script lang="ts">
	import { goto } from "$app/navigation";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { validatePassword } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import type { AuthError } from "@supabase/supabase-js";

	let error: AuthError | null;
	let password = { content: "", isValid: true };
	let password_repeat = { content: "", isValid: true };
	let successMessage: string | null;

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
				class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
				required
			/>
			{#if password.content !== password_repeat.content}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Diese Eingabe stimmt nicht mit dem Passwort überein.</p>
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
				<p class="mt-2 rounded-sm bg-red p-2">Fehler beim zurücksetzen des Passworts</p>
			</FadeIn>
		{:else if successMessage}
			<FadeIn>
				<p class="mt-2 rounded-sm text-yellow">{successMessage}</p>
			</FadeIn>
		{/if}
	</form>
</div>
