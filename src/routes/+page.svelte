<!-- <script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script> -->
<script lang="ts">
  import logo from '$lib/logo.png';
</script>

<div class="jumbotron text-center">
    <!-- <h1 class="display-1" style="font-size: 2in; color: black">Welcome to <b>P.U.N.</b></h1> -->
    <img src={logo} alt="RIP" class="border border-5 border-primary rounded-5" style="width: 25%; margin: 2% auto;">
    <p class="lead fs-1" style="color: black">A helpful, convenient toolkit that serves to keep packages <br> optimized to the user's preferences and
        send email notifications <br> to remind them to keep things up to date.</p>
    <hr class="my-4" style="color: black">
    <p class="fs-2" style="color: black;">A Package Update Notifier that can make developer lives easier!</p>
    <!-- <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Sign in to GitHub</a>
    </p> -->
</div>
