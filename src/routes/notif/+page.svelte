<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
	import type { backend_response, package_info, repo_settings } from "$lib/supabaseInterfaces";
    
    

    //create a new repo_setting row
    const theRepoId = "";
    const email = "";
    const theExcludedPackages = "";
    const notifreq = "";
    const notifday = "";
    async function createNewSetting() {
        const { data, error } = await supabase
        .from('repo_settings')
        .insert([
        { repo_id: theRepoId, email: email, excluded_packages: theExcludedPackages, notification_frequency: notifreq, notification_day : notifday  },
        ])
    }
    

</script>

<!-- Checkbox tool opt IN -->
<div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      Default checkbox
    </label>
  </div>

<!-- Checkbox tool opt Out -->
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
    <label class="form-check-label" for="flexCheckChecked">
      Checked checkbox
    </label>
  </div>

<!-- Jumbotron display -->
<div class="jumbotron">
    <h1 class="display-1" style="color: white">Configurations</h1>
    <p class="lead fs-1" style="color: white;">Receive useful notifications through our customizable emailing feature. Customize the frequency of emails and which
      repos/packages you want to notify for. </p>
    <hr class="my-4" style="color: black">
    <p class="fs-2" style="color: white;">A Package Update Notifier that can make developer lives easier!</p>  
    <p class="lead">
    </p>
</div>