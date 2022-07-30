{#if data.type == "video"}
    <SearchedVideo {data}/>
{:else if data.type == "channel"}
    <SearchedChannel {data}/>
{:else if data.type == "playlist"}
    <SearchedPlaylist {data}/>
{/if}


<script lang="ts">
import SearchedChannel from "./SearchResultComponents/SearchedChannel.svelte";
import SearchedPlaylist from "./SearchResultComponents/SearchedPlaylist.svelte";
import SearchedVideo from "./SearchResultComponents/SearchedVideo.svelte";

import type {TypeSearchedChannel, TypeSearchedPlaylist, TypeSearchedVideo} from "../interfaces/Search"

export let data:(TypeSearchedChannel|TypeSearchedPlaylist|TypeSearchedVideo);
</script>