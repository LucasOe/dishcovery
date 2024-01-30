<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";

	import { user } from "$lib/functions/stores";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import {
		userNameisTaken,
		validateEmail,
		validatePassword,
		validateUsername
	} from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let username = {
		content: "",
		isValid: true,
		message: "",
	};
	let email = {
		content: "",
		isValid: true,
	};
	let password = {
		content: "",
		isValid: true,
	};
	let password_repeat = {
		content: "",
		isValid: true,
	};

	let inputs = [username, email, password, password_repeat];

	let isFormValid = true;
	let isUsernameTaken = false;

	let error: AuthError | null = null;

	async function handleRegister()
	{
		isFormValid = true;
		isUsernameTaken = false;

		for (let input of inputs) {
			if (!input.isValid) {
				isFormValid = false;
				return;
			}
		}

		// Check if the username is already taken
		if(await userNameisTaken(username.content)) {
			username.message = "Der Benutzername wird bereits verwendet."
			return;
		}

		try {
			const { data, error: auth_error } = await supabase.auth.signUp({
				email: email.content,
				password: password.content,
				options: {
					data: {
						username: username.content,
						avatar_url: "https://avatars.dicebear.com/api/avataaars/John.svg",
					},
				},
			});

			if (data.user) {
				goto("/register_success");
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


	async function handleGuestLogin() {
		const guestUser = {
			id: "guest_id",
			username: "guest",
			avatar_url: "",
		};

		$user = guestUser;
		localStorage.setItem("guestUser", JSON.stringify(guestUser));
		goto("/");
	}
</script>

<div class="flex flex-col gap-md">
	<Section title="Benutzername">
		<input
			bind:value={username.content}
			on:input={() => (username.isValid = validateUsername(username.content))}
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
	<Section title="Passwort wiederholen">
		<input
			bind:value={password_repeat.content}
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
	{#if !isFormValid}
		<FadeIn>
			<p class="mt-2 rounded-sm bg-red p-2">Bitte korrigiere Deine Eingaben.</p>
		</FadeIn>
	{/if}

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
		<button on:click={handleGuestLogin}> Als Gast beitreten </button>
	</div>

	{#if error}
		<p class="text-red-500">
			{#if error.message.toLowerCase().includes("signup requires a valid password")}
				Anmeldung erfordert ein gültiges Passwort
			{:else}
				Es ist ein Fehler aufgetreten: {error.message}
			{/if}
		</p>
	{/if}
	{#if isUsernameTaken}
		<FadeIn>
			<p class="mt-2 rounded-sm bg-red p-2">Der Benutzername ist bereits vergeben.</p>
		</FadeIn>
	{/if}
</div>
