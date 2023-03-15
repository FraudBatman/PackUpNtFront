<script lang="ts">
	import { user } from '$lib/sessionStore';
</script>

{#if user}
	<slot />
{:else}
	<h1><strong>NOT LOGGED IN + L + RATIO</strong></h1>
{/if}
