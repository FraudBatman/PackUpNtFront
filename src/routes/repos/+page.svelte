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

<div class="jumbotron">
	<h1 class="display-1" style="color: black">Repositories</h1>
    <p class="lead fs-1" style="color: black;">An organized GitHub directory where you can view your repo projects and view current, most recent, and recommended updates. </p>
    
    <hr class="my-4" style="color: black">
    <!-- <p class="fs-2" style="color: black;">A Package Update Notifier that can make developer lives easier!</p> -->
    <p class="lead">
    </p>
</div>

<main>
	<div class="container text-center fs-3" style="color: black;"><b>REPOS</b>
		{#await userTest() then data} <!--rewrite userTest() to return the response, instead of just console.logging it-->
  			{#each data as repository}
    		<div class="row">
				<div class="col">{repository.name}</div>
				<div class="col">{repository.visibility}</div>
				<div class="col">{repository.created_at}</div>
			</div>

  			{/each}
		{/await}

		<!-- <div class="row">
			<div class="col">Test</div>
			<div class="col">Test2</div>
			<div class="col">Test3</div>
		</div> -->
	</div>	
</main>
