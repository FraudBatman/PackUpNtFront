<script lang="ts">
	import { octokit } from '$lib/octokit';
	import { user } from '$lib/sessionStore';

	async function userTest() {
		let userName: string = '';
		if (user != undefined && user.identities != undefined) {
			userName = user?.identities[0]?.identity_data.user_name;
		} else {
			return;
		}
		console.log(userName);
		let { data } = await octokit.request('GET /users/{username}/repos', {
			username: userName,
			headers: {}
		});
		//console.log(data);
		return data;
	}
</script>

{#await userTest() then data} <!--rewrite userTest() to return the response, instead of just console.logging it-->
  {#each data as repository}
    <p>{repository.name}</p>
  {/each}
{/await}

<div class="jumbotron bg-light-subtle">
    <h1 class="display-1">Welcome to P.U.N.</h1>
    <p class="lead fs-1">A helpful, convenient toolkit that serves to keep packages optimized to the user's preferences and
        send email notifications to remind them to keep things up to date.</p>
    <hr class="my-4">
    <p class="fs-2">A Package Update Notifier that can make developer lives easier!</p>
    <p class="lead">
      <!-- <a class="btn btn-primary btn-lg" href="#" role="button">Sign in to GitHub</a> -->
    </p>
</div>

<main>
	<h1>Packages</h1>
	<!-- <button on:click={userTest}>ass</button> -->
	<div class="container text-center border border-secondary border-4">REPOS
		<div class="row">
			<div class="col">Test</div>
			<div class="col">Test2</div>
			<div class="col">Test3</div>
		</div>
	</div>	
</main>
