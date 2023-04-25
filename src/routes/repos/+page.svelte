<script lang="ts">
	import { octokit } from '$lib/octokit';
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import type { backend_response, package_info, repo_settings } from '$lib/supabaseInterfaces';

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

	//pull all rows from repo settings
	async function pullSettings(repo_id: string) {
		let { data, error } = await supabase
			.from('repo_settings')
			.select('*')
			//add this to only get settings for a specific repo
			.eq('repo_id', repo_id);

		var repo_settings = <repo_settings[]>data;
		return repo_settings[0];
	}

	//create a new repo_setting row
	async function createNewSetting(repo_id: string) {
		const { data, error } = await supabase.from('repo_settings').insert([
			{
				repo_id: repo_id,
				email: user?.email,
				excluded_packages: null,
				notification_frequency: 'Weekly',
				notification_day: 'Monday',
				enabled: true
			}
		]);
	}

	// update existing rows in repo settings
	async function updateSettings(repo_id: string, enabled: boolean) {
		const { data, error } = await supabase
			.from('repo_settings')
			.update({ enabled: enabled })
			.eq('repo_id', repo_id);
	}

	async function saveChanges() {
		var checkboxes = document.querySelectorAll('input[type=checkbox]');

		for (var i = 0; i < checkboxes.length; i++) {
			var repo = checkboxes[i] as HTMLInputElement;
			var settings = await pullSettings(repo.id);

			// when checkbox is checked
			if (repo.checked) {
				if (settings) {
					if (settings.enabled) {
						// console.log("Already opted in!");
					} else {
						updateSettings(repo.id, true);
						// console.log("Opting in...");
					}
				} else {
					createNewSetting(repo.id);
					// console.log("Creating new setting and opting in...");
				}
			} else {
				if (settings) {
					if (settings.enabled) {
						updateSettings(repo.id, false);
						// console.log("Opting out...");
					} else {
						// console.log("Already opted out!");
					}
				} else {
					// console.log("No settings to delete!");
				}
			}
		}
		alert('Changes Saved!');
	}
</script>

<div class="jumbotron">
	<h1 class="display-1" style="color: white">Repositories</h1>
	<p class="lead fs-1" style="color: white;">
		An organized GitHub directory where you can see owned repos and choose to opt-in to
		notifications.
	</p>

	<hr class="my-4" style="color: black" />
	<p class="lead" />
</div>

<main>
	<div class="container fs-3 text-center">
		{#await userTest() then repos}
			<div class="row">
				<div class="col-12">
					<table class="table table-dark table-striped table-bordered fs-3 text-center">
						<thead>
							<tr>
								<th class="col-1" scope="col">Opt-in</th>
								<th scope="col">{repos[0].owner.login}'s Repos</th>
							</tr>
						</thead>
						<!--Body Start-->
						<tbody>
							{#if repos}
								{#each repos as repo}
									<tr>
										<td>
											<div class="custom-control custom-checkbox">
												{#await pullSettings(repo.id) then settings}
													{#if settings.enabled}
														<input
															class="form-check-input"
															type="checkbox"
															value=""
															id={repo.id}
															checked
														/>
													{:else}
														<input class="form-check-input" type="checkbox" value="" id={repo.id} />
													{/if}
												{/await}
											</div>
										</td>
										<td><label class="custom-control-label" for={repo.id}>{repo.name}</label></td>
									</tr>
								{/each}
							{:else}
								<tr><td>N/A</td><td>{repos[0].owner.login} does not own any public repos</td></tr>
							{/if}
						</tbody>
						<!--Body End-->
					</table>
				</div>
			</div>
			{#if repos}
				<button class="btn btn-primary" type="submit" on:click={saveChanges}>Save changes</button>
			{/if}
		{/await}
	</div>
</main>
