<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
	import type { backend_response, package_info, repo_settings } from "$lib/supabaseInterfaces";
    
    //pull all rows from repo settings
    async function pullAllSettings() {
        let { data, error } = await supabase
            .from('repo_settings')
            .select('*')
            //add this to only get settings for a specific repo
            // .eq('repo_id', repoIdAsVariable)

            var repo_settings = <repo_settings[]>data;

            return repo_settings;
    }

    // update existing rows in repo settings
	async function updateFreq(repo_id: string, freq: string) {
		const { data, error } = await supabase
  			.from('repo_settings')
  			.update({ notification_frequency: freq })
  			.eq('repo_id', repo_id)
	}
    
    // update existing rows in repo settings
	async function updateDay(repo_id: string, day: string) {
		const { data, error } = await supabase
  			.from('repo_settings')
  			.update({ notification_day: day })
  			.eq('repo_id', repo_id)
	}
    
    const freq_list = ["Weekly", "Monthly"];
    const day_list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function freqSelectHandler(event: any) {
        var repoId = event.target.parentElement.id;
        var freq = event.target.value;

        updateFreq(repoId, freq);
        console.log(pullAllSettings());
    }

    function daySelectHandler(event: any) {
        var repoId = event.target.parentElement.id;
        var day = event.target.value;
        
        updateDay(repoId, day);
        console.log(pullAllSettings());
    }

    console.log(pullAllSettings());

</script>

<!-- Jumbotron display -->
<div class="jumbotron">
    <h1 class="display-1" style="color: white">Notifications</h1>
    
    <p class="lead fs-1" style="color: white;">Receive useful notifications through our customizable emailing feature. Customize the frequency of emails and which
      repos/packages you want to notify for. </p>
    <hr class="my-4" style="color: black">
    <div class="text-center fs-3" style="color: white;">
        {#await pullAllSettings() then all_settings}
			{#each all_settings as repo}
            <!-- {localSettings(repo)} -->
            <div class="row" id={repo.repo_id}>
                <div class="col">{repo.repo_id}</div>
                <select class="form-select col" id="" on:change={freqSelectHandler}>
                    {#each freq_list as freq}
                        {#if repo.notification_frequency == freq}
                            <option selected>{freq}</option>
                            {:else}
                            <option>{freq}</option>
                        {/if}
                    {/each}
                </select>

                <select class="form-select col" id="" on:change={daySelectHandler}>
                    {#each day_list as day}
                        {#if repo.notification_day == day}
                            <option selected>{day}</option>
                            {:else}
                            <option>{day}</option>
                        {/if}
                    {/each}
                </select>
            </div>
            {/each}
    {/await}
    </div>  
    <p class="lead">
    </p>
</div>