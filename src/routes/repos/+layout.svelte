<script lang="ts">
	import { user } from '$lib/sessionStore';
</script>

{#if user}
	<slot />
{:else}
	<h1 style="color: white;"><strong>Please login to view repositories</strong></h1>
{/if}
