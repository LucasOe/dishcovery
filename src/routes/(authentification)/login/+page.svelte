<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Button from "$lib/components/Button.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import supabase from "../../supa";
	import { goto } from "$app/navigation";
	

	let email = "";
	let password = "";



	async function handleLogin() {
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data) {
        goto("/profile");
      } else {
        console.log(error);
      }
  }
</script>


<!-- 	<Section title="E-Mail Adresse">
			<TextInput type="text" />
		</Section>
		<Section title="Passwort">
			<TextInput type="password" />

			<div class="flex items-center justify-between">
			<Checkbox name="remember" label="Angemeldet bleiben"></Checkbox>
			<LinkText link="/reset-password" title="Passwort zurücksetzen">Passwort vergessen?</LinkText>
		</div>

		<Button>Login</Button>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<span>Noch kein Konto?</span>
				<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt registrieren</LinkText>
			</div>
			<LinkText link="/" title="Als Gast beitreten">Als Gast beitreten</LinkText>
		</div>
	</div>
</FadeIn>
		</Section>-->
	
		<div class="loginFormContainer">
			<form class="loginForm" on:submit|preventDefault={handleLogin}>
			  <input style="color: black;" type="email" bind:value={email} placeholder="email@email.com" />
			  <input style="color: black;" type="password" bind:value={password} placeholder="Password" />
			  <button type="submit">Login</button>
			</form>
			<a href="/register">Not a Member? Sign up!</a>
		  </div>

		