<!-- <script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script> -->
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

<h1>Home</h1>
<b style="font-size: 40px">
	A helpful, convenient toolkit that serves to keep packages optimized to the user's preferences and
	send email notifications to remind them to keep things up to date.
</b>
<button on:click={userTest}>ass</button>
