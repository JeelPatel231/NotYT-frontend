<svelte:head>
    <title>{data.searchTerm} - NotYoutube</title>
</svelte:head>
<div class="video-card-container">
    {#each data.data as item}
        <SearchResults data={item} />
    {/each}
</div>

<style>
.video-card-container{
    max-width: 1096px;
    margin: 0 auto;
}
</style>

<script lang="ts">
import type { TypeSearchedChannel, TypeSearchedPlaylist, TypeSearchedVideo } from "src/interfaces/Search";
import SearchResults from "../../components/SearchResults.svelte"

export let data:{
    data : (TypeSearchedVideo|TypeSearchedChannel|TypeSearchedPlaylist)[],
    searchTerm:string;
}

// JS FN FOR LOADING MORE, OR NEXT PAGE URL FOR NEXT PAGE
</script>