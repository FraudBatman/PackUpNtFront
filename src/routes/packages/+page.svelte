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
		console.log(data);
	}
</script>

<main>
	<h1>Packages</h1>
	<button on:click={userTest}>ass</button>
</main>
