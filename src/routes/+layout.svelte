<script lang="ts">
	import { invalidate } from '$app/navigation';
	import GithubLogin from '$lib/GithubLogin.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import logo from '$lib/logo.png';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	export let data: LayoutData;
</script>

<nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/" style="width: 2.5%"><img src={logo} class="rounded img-fluid" alt="RIP"></a>
		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<a class="nav-link" href="/repos">Repositories</a>
				<a class="nav-link" href="/notif">Notifications</a>
			</div>
		</div>
		<GithubLogin />
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavAltMarkup"
			aria-controls="navbarNavAltMarkup"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
	</div>
</nav>

<slot />
