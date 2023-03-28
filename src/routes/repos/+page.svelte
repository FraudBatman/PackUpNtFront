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
		return data;
	}
</script>

<div class="jumbotron">
	<h1 class="display-1" style="color: white">Repositories</h1>
    <p class="lead fs-1" style="color: white;">An organized GitHub directory where you can view your repo projects and view current and most recent updates. </p>
    
    <hr class="my-4" style="color: black">
    <p class="lead">
    </p>
</div>

<main>
	<div class="container text-center fs-3" style="color: white;"><b>REPOS</b>
		{#await userTest() then data}
  			{#each data as repository}
    		<div class="row">
				<div class="col">{repository.name}</div>
				<div class="col">{repository.visibility}</div>
				<div class="col">{repository.created_at}</div>
			</div>

  			{/each}
		{/await}
	</div>	
</main>
