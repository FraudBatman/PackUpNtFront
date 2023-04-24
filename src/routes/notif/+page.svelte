<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
	import { user } from '$lib/sessionStore';
	import { octokit } from '$lib/octokit';

	import type { backend_response, package_info, repo_settings } from "$lib/supabaseInterfaces";
    
    async function userTest() {
		let userName: string = '';
		if (user != undefined && user.identities != undefined) {
			userName = user?.identities[0]?.identity_data.user_name;
		} else {
			return;
		}
		let { data }: any = await octokit.request('GET /users/{username}/repos', {
			username: userName,
			headers: {}
		});
		return data;
	}

    async function pullSettings() {
        let { data, error } = await supabase
            .from('repo_settings')
            .select('*')
            //add this to only get settings for a specific repo
            .eq('email', user?.email)

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
        var repoId = event.target.parentElement.parentElement.id;
        var freq = event.target.value;

        updateFreq(repoId, freq);
    }

    function daySelectHandler(event: any) {
        var repoId = event.target.parentElement.parentElement.id;
        var day = event.target.value;

        updateDay(repoId, day);
    }

</script>

<!-- Jumbotron display -->
<div class="jumbotron">
    <h1 class="display-1" style="color: white">Notifications</h1>
    
    <p class="lead fs-1" style="color: white;">Choose which day of the week and how often you want to receive email notifications.</p>
    <hr class="my-4" style="color: black">
    <div class="container text-center fs-3" style="color: white;">
        {#await userTest() then repos}
            {#await pullSettings() then all_settings}
            <div class="row">
            <div class="col-12">
            <table class="table table-dark table-striped table-bordered fs-3 text-center">
                <thead>
                    <tr>
                        <th class="col" scope="col">Opted-in Repos</th>
                        <th class="col-2" scope="col">Frequency</th>
                        <th class="col-2" scope="col">Day</th>

                    </tr>
                </thead>
                <!--Body Start-->
                <tbody>
                    
                {#each all_settings as setting}
                <tr id={setting.repo_id}>
                    <td>
                        <div class="col">{repos[0].name}</div>
                    </td>
                    <td>
                        <select class="form-select col" id="" on:change={freqSelectHandler}>
                            {#each freq_list as freq}
                                {#if setting.notification_frequency == freq}
                                    <option selected>{freq}</option>
                                    {:else}
                                    <option>{freq}</option>
                                {/if}
                            {/each}
                        </select>
                    </td>
                    <td>
                        <select class="form-select col" id="" on:change={daySelectHandler}>
                            {#each day_list as day}
                                {#if setting.notification_day == day}
                                    <option selected>{day}</option>
                                    {:else}
                                    <option>{day}</option>
                                {/if}
                            {/each}
                        </select>
                    </td>    
                </tr>
                {/each}
                </tbody>
            </table>
            </div>
            </div>
        {/await}
    {/await}

    </div>  
    <p class="lead">
    </p>
</div>