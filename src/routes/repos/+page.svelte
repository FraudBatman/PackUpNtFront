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
		// console.log(userName);
		// let { data } = await octokit.request('GET /users/{username}/repos', {
		// 	username: userName,
		// 	headers: {}
		// });
		// return data;
		return userName;
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

    // pullBackendResponse();
    
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

    // pullPackages();

    //pull all rows from repo settings
    async function pullSettings() {
        let { data, error } = await supabase
            .from('repo_settings')
            .select('*')
            //add this to only get settings for a specific repo
            // .eq('repo_id', repoIdAsVariable)

            var repo_settings = <repo_settings[]>data;

            return repo_settings;
    }

	// update existing rows in repo settings
	async function updateSettings() {
		const { data, error } = await supabase
  			.from('repo_settings')
  			.update({ excluded_packages: 'otherValue' })
  			.eq('repo_id', 123456789)
	}

	function checkboxHandler(event: any) {
		if (event.target.checked) {
			alert(event.type);
		}
	}
	// console.log(pullPackages(123456789));
	// console.log(pullSettings());



    // pullSettings();

</script>

<div class="jumbotron">
	<h1 class="display-1" style="color: white">Repositories</h1>
    <p class="lead fs-1" style="color: white;">An organized GitHub directory where you can view your repo projects and view current and most recent updates. </p>
    
    <hr class="my-4" style="color: black">
    <p class="lead">
    </p>
</div>

<main>
	<div class="container text-center fs-3" style="color: white;"><b>{#await userTest() then userName}{userName}'s {/await}Repos</b>
		{#await pullBackendResponse() then backend_reponse}
			{#each backend_reponse as repo}
			<!-- default checkbox for each repo starts unchecked -->
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id={repo.repo_id} on:change={checkboxHandler}>
					<label class="form-check-label" for={repo.repo_id}>
					Repo ID: {repo.repo_id}
					</label>
			  	</div>
				{#await pullPackages(repo.id) then package_info}
					{#each package_info as pkg}
						<!-- each pkg unchecked -->
						
						<div class="row" style="">
							<div class="form-check col" style="">
								<!-- use string concatenation to give unique id for each package -->
								<input class="form-check-input" type="checkbox" value="" id={String(pkg.response_id) + String(pkg.id)}>
								<label class="form-check-label" for={String(pkg.response_id) + String(pkg.id)}>
									<div class="">Package name: {pkg.package_name}</div>
								</label>
							</div>
							<div class="col">Installed version: {pkg.repo_version}</div>
							<div class="col">Most recent version: {pkg.current_version}</div>
						</div>
					{/each}
				{/await}
			{/each}
		{/await}
		<!-- {#await main() then data}
  			{#each data as repository}
    		<div class="row">
				<div class="col">{repository.name}</div>
				<div class="col">{repository.visibility}</div>
				<div class="col">{repository.created_at}</div>
			</div>

  			{/each}
		{/await} -->
	</div>	
</main>
