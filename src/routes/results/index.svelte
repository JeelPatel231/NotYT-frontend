<div>
    {#each data as item}
        <SearchResults data={item} />
    {/each}
</div>

<script context="module">
const ssr = false
export const load = async ({ fetch, url }) => {
    const res = await fetch(`/proxy/${get(API_ENDPOINT)}/api/v1/search${url.search}`);
    const data = await res.json();
    if(res.ok){
        return{
            props:{
                data
            }
        }
    } else {
        return{
            status : res.status,
            error: new Error(res.status)
        } 
    }
}
</script>

<script lang="ts">
import { API_ENDPOINT } from "../../store/store"
import { get } from "svelte/store";
import type { TypeSearchedChannel, TypeSearchedPlaylist, TypeSearchedVideo } from "src/interfaces/Search";
import SearchResults from "../../components/SearchResults.svelte"

export let data:(TypeSearchedVideo|TypeSearchedChannel|TypeSearchedPlaylist)[];


// JS FN FOR LOADING MORE, OR NEXT PAGE URL FOR NEXT PAGE
</script>