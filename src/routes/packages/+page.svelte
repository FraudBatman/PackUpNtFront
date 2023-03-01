<script lang="ts">
	import { user } from '$lib/sessionStore';

	function userTest(): void {
		console.log(user);
		let userName: string = '';

		if (user != undefined && user.identities != undefined) {
			let userName = user?.identities[0]?.identity_data['user_name'];
		} else {
			return;
		}
	}
</script>

<main>
	<h1>Packages</h1>
	<button on:click={userTest}>ass</button>
</main>
