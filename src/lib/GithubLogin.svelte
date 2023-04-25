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
		<button class="btn btn-primary" on:click={signInWithGitHub}>Log in with GitHub</button>
	{/if}
</main>
