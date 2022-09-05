<div class="channel-background">
    <img class="channel-banner" src={data.channel_data.authorBanners.at(-1)?.url} alt={data.channel_data.authorId}>
    <div class="max-width-container">
        <div class="flex-items-center">
            <img class="thumbnail" src={data.channel_data.authorThumbnails.at(3)?.url} alt={data.channel_data.author}>
            <div class="info">
                <div class="text-headline5 author-name">{data.channel_data.author}</div>
                <div class="text-body2 sub-count">{nFormatter(data.channel_data.subCount)} subscribers</div>
            </div>
            <!-- <div class="subscribe"></div> ????? -->
        </div>
        <div class="flex-items-center text-body2">
            {#each Object.keys(channelTabs) as tab}
                <a href={tab}>
                    <div class="tab-item flex-items-center" class:active={data.activeTab === tab}>
                        <span>{tab.toUpperCase()}</span>
                    </div>
                </a>
            {/each}
            <!-- TODO : IMPLEMENT SEARCH WITH RESPONSIVENESS -->
            <!-- <div class="tab-item flex-items-center">
                <span>SEARCH</span>
            </div> -->
        </div>
        <svelte:component data={data.tab_data} this={channelTabs[data.activeTab]}/>
    </div>
</div>

<style>
.channel-background{
    /* height:calc(16.1290322581vw - 1px); KANGED FROM YOUTUBE */
}
.channel-banner{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.max-width-container{
    max-width: 1284px;
    margin: 0 auto;
    padding: 16px;
}
.author-name{
    margin-bottom: 4px;
}
.sub-count{
    color: var(--subtitle-text);
}
.thumbnail{
    height: 80px;
    width: 80px;
    margin-right: 24px;
    border-radius: 40px;
}

.tab-item{
    height: 48px;
    padding: 0 30px;
}
.tab-item.active{
    border-bottom: 3px solid var(--subtitle-text);
}
</style>

<script lang="ts">
import { nFormatter } from "../../../../store/utils/functions";
import type TypeChannel from "../../../../interfaces/Channels"
import ChannelVideos from "../../../../components/channelTabs/ChannelVideos.svelte";
import ChannelComments from "../../../../components/channelTabs/ChannelComments.svelte";
import ChannelPlaylists from "../../../../components/channelTabs/ChannelPlaylists.svelte";
import ChannelAbout from "../../../../components/channelTabs/ChannelAbout.svelte";

import type TypeChannelComments from "src/interfaces/ChannelComments";
import type TypeChannelPlaylist from "src/interfaces/ChannelPlaylist";
import type TypeChannelLatest from "src/interfaces/ChannelLatest";

import type { SvelteComponent} from "svelte";

export let data:{
    channel_data:TypeChannel;
    activeTab:string;
    tab_data:(TypeChannelPlaylist[]|TypeChannelComments[]|TypeChannel|TypeChannelLatest[]);
}

const channelTabs:{
    [key:string]:typeof SvelteComponent
} = {
    "latest": ChannelVideos,
    "videos": ChannelVideos,
    "comments": ChannelComments,
    "playlists":ChannelPlaylists,
    "about": ChannelAbout
}
</script>