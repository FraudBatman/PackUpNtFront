<script lang="ts">
	import { octokit } from '$lib/octokit';
	import { user } from '$lib/sessionStore';
	import { supabase } from "$lib/supabaseClient";
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

	// pull all rows from backend response
	async function pullBackendResponse() {
        let { data, error } = await supabase
        .from('backend_reponse')
        .select('*')
        //add this to only get specific repo
        // .eq('repo_id', 123456789)

        var backend_reponse = <backend_response[]>data
        // console.log(backend_reponse);

        return backend_reponse;
    }
    
    //pull all rows from package info
    async function pullPackages(response_id: number){
        let { data, error } = await supabase  
            .from('package_info')
            .select('*')
            //add this to only get package from a specific response
            .eq('response_id', response_id)

            var package_info = <package_info[]>data;

            return package_info;
    }

    //pull all rows from repo settings
    async function pullSettings(repo_id: string) {
        let { data, error } = await supabase
            .from('repo_settings')
            .select('*')
            //add this to only get settings for a specific repo
            .eq('repo_id', repo_id)

            var repo_settings = <repo_settings[]>data;
			console.log(repo_settings[0]);
            return repo_settings[0];
    }

	//create a new repo_setting row
    async function createNewSetting(repo_id: string) {
        const { data, error } = await supabase
        .from('repo_settings')
        .insert([
        { repo_id: repo_id, email: user?.email, excluded_packages: null, notification_frequency: "Weekly", notification_day : "Monday"  },
        ])
    }

	// update existing rows in repo settings
	async function updateSettings() {
		const { data, error } = await supabase
  			.from('repo_settings')
  			.update({ excluded_packages: 'otherValue' })
  			.eq('repo_id', 123456789)
	}
	
	async function deleteSetting(repo_id: string) {
		const { error } = await supabase
  			.from('repo_settings')
  			.delete()
  			.eq('repo_id', repo_id)
	}
	
	async function saveChanges() {
		var checkboxes = document.querySelectorAll('input[type=checkbox]')

		for (var i = 0; i < checkboxes.length; i++) {
			var repo = checkboxes[i] as HTMLInputElement;
			var settings = await pullSettings(repo.id);
			
			// when checkbox is checked
			if (repo.checked) {
				if (settings) {
					console.log("Settings already exist!");
				}
				else {
					createNewSetting(repo.id);
					console.log("Opting in...");
				}
			}
			else {
				if (settings) {
					deleteSetting(repo.id);
					console.log("Opting out...");
				}
				else {
					console.log("No settings to delete!");
				}
			}
		}
	}

	// function repoCheckboxHandler(event: any) {
	// 	if (event.target.checked) {
	// 		var repoId = event.target.id;

	// 		alert(repoId);
	// 	}
	// }
	
	// function pkgCheckboxHandler(event: any) {
	// 	if (event.target.checked) {
	// 		var repoId = event.target.parentElement.parentElement.parentElement.id;
	// 		var pkgName = event.target.name;

	// 		alert(repoId + pkgName);
	// 	}
	// }
	// console.log(pullPackages(123456789));

	// console.log(pullSettings());

</script>

<div class="jumbotron">
	<h1 class="display-1" style="color: white">Repositories</h1>
    <p class="lead fs-1" style="color: white;">An organized GitHub directory where you can view your repo projects and view current and most recent updates. </p>
    
    <hr class="my-4" style="color: black">
    <p class="lead">
    </p>
</div>

<main>
	<div class="container">
		{#await userTest() then repos}<b>{repos[0].owner.login}'s Repos</b>
		{#each repos as repo}
		<div class="row">
		  <div class="col-12">
			<table class="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">Repo OPT-IN</th>
				  <th scope="col">Repo Identification</th>
				</tr>
			  </thead>
			  <!--Body Start-->
			  <tbody>
				<tr>
				  <td>
					<div class="custom-control custom-checkbox">
						<input type="checkbox" class="custom-control-input" id="customCheck1">
						{#await pullSettings(repo.id) then settings}
                        {#if settings}    
                            <input class="form-check-input" type="checkbox" value="" id={repo.id} checked>
                        {:else}
                            <input class="form-check-input" type="checkbox" value="" id={repo.id}>
                        {/if}
                    	{/await}
						<label class="custom-control-label" for="customCheck1">1</label>
					</div>
				  </td>
				  <td>Bootstrap 4 CDN and Starter Template</td>
				</tr>
			  </tbody>
			  <!--Body End-->
			</table>
		  </div>
		</div>
		{/await}
		{/each}
	</div>
</main>
