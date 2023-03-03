<script lang="ts">
	import { user } from './sessionStore';
	import { supabase } from './supabaseClient';

	var loggedIn: boolean = user != null;
	var userName =
		user != null && user.identities != undefined
			? user.identities[0].identity_data.full_name
			: 'no username';
	var loginClass = 'btn btn-secondary';

	function buttonPanic() {
		loginClass = 'btn btn-danger';
	}

	function ohThankGodItsOver() {
		loginClass = 'btn btn-secondary';
	}

	async function signInWithGitHub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				scopes: 'repo'
			}
		});
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		location.reload();
		if (error != null) console.log(error);
	}
</script>

<main style="color: white">
	{#if loggedIn}
		Hello, {userName}!
		<button
			class={loginClass}
			on:click={signOut}
			on:mouseenter={buttonPanic}
			on:mouseleave={ohThankGodItsOver}>Log Out?</button
		>
	{:else}
		<button class="btn btn-primary" on:click={signInWithGitHub}
			><img
				src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384f934b806f37f4956_145dc557845548a36a82337912ca3ac5.svg"
				class="img-fluid"
				id="discordLogo"
				alt="Discord Logo"
			/>Log In with Dis I Mean github</button
		>
	{/if}
</main>

<style>
	#discordLogo {
		margin-right: 10px;
		max-height: 1.25em;
	}
</style>
