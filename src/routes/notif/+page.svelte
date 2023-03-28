<script lang="ts">
    import { supabase } from "$lib/supabaseClient";

    async function test() {
        let { data: backend_reponse, error } = await supabase
            .from('backend_reponse')
            .select('*')
    console.log(data);
    
    //add this to only get specific repo
    // .eq('repo_id', getTheRepoIdAndPutInAsAVariableHere)
    }

</script>

<div class="jumbotron">
    <h1 class="display-1" style="color: white">Notifications</h1>
    <p class="lead fs-1" style="color: white;">Receive useful notifications through our customizable emailing feature. Customize the frequency of emails and which
      repos you want to notify for. </p>
    <hr class="my-4" style="color: black">
    <p class="fs-2" style="color: white;">A Package Update Notifier that can make developer lives easier!</p>
    <p class="lead">
    </p>
</div>