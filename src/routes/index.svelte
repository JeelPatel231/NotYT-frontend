<svelte:head>
    <title>NotYoutube | Home</title>
</svelte:head>
<!-- FILL WITH TRENDING/POPULAR -->

<div class="video-container">
    {#each data as entry}
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

<script context="module">
export const load = async ({ fetch }) => {
    const res = await fetch(`${get(FINAL_HOST)}/api/v1/popular`);
    const data = await res.json();
    return{
        props:{
            data,
        }
    }
}
</script>

<script lang="ts">
import { FINAL_HOST } from "../store/store";
import { get } from "svelte/store";
import type Popular from "../interfaces/Popular";
import SingleHomeVideo from "../components/SingleHomeVideo.svelte";

export let data:Popular[];
</script>