<svelte:head>
    <title>NotYoutube | Home</title>
</svelte:head>
<!-- FILL WITH TRENDING/POPULAR -->

<div class="video-container">
    {#each data.data as entry}
        <SingleHomeVideo data={entry}/>
    {/each}
</div>

<style>
.video-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>

<script lang="ts">
import type Popular from "../interfaces/Popular";
import SingleHomeVideo from "../components/SingleHomeVideo.svelte";

export let data:{
    data: Popular[];
}

</script>