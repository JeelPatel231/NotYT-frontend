<div class="channel-background">
    <img class="channel-banner" src={channel_data.authorBanners.at(-1)?.url} alt={channel_data.authorId}>
    <div class="max-width-container">
        <div class="flex-items-center">
            <img class="thumbnail" src={channel_data.authorThumbnails.at(3)?.url} alt={channel_data.author}>
            <div class="info">
                <div class="text-headline5 author-name">{channel_data.author}</div>
                <div class="text-body2 sub-count">{nFormatter(channel_data.subCount)} subscribers</div>
            </div>
            <!-- <div class="subscribe"></div> ????? -->
        </div>
        <div class="flex-items-center text-body2">
            {#each Object.keys(channelTabs) as tab}
                <a href={tab}>
                    <div class="tab-item flex-items-center" class:active={activeTab === tab}>
                        <span>{tab.toUpperCase()}</span>
                    </div>
                </a>
            {/each}
            <!-- TODO : IMPLEMENT SEARCH WITH RESPONSIVENESS -->
            <!-- <div class="tab-item flex-items-center">
                <span>SEARCH</span>
            </div> -->
        </div>
        <svelte:component data={tab_data} this={channelTabs[activeTab]}/>
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
    color: #606060;
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
    border-bottom: 3px solid #606060;
}
</style>

<script context="module">
import { FINAL_HOST } from "../../../store/store";
import { get } from "svelte/store";

export const load = async ({ fetch, params }) => {
    const channel_res = await fetch(`${get(FINAL_HOST)}/api/v1/channels/${params.id}`);
    const channel_data = await channel_res.json();
    let tab_data = undefined;
    if(params.tab !== "about"){  // about tab needs channel data and no /about path exists for api
        const tab_res = await fetch(`${get(FINAL_HOST)}/api/v1/channels/${params.id}/${params.tab}`);
        tab_data = await tab_res.json();
    } 
    return{
        props:{
            channel_data,
            activeTab:params.tab,
            tab_data: tab_data ?? channel_data,
        }
    }
}
</script>

<script lang="ts">
import { nFormatter } from "../../../store/utils/functions";
import type Channels from "../../../interfaces/Channels"
import ChannelVideos from "../../../components/channelTabs/ChannelVideos.svelte";
import ChannelComments from "../../../components/channelTabs/ChannelComments.svelte";
import ChannelPlaylists from "../../../components/channelTabs/ChannelPlaylists.svelte";
import ChannelAbout from "../../../components/channelTabs/ChannelAbout.svelte";

export let channel_data:Channels;
export let activeTab:string;
export let tab_data;
const channelTabs = {
    "latest": ChannelVideos,
    "videos": ChannelVideos,
    "comments": ChannelComments,
    "playlists":ChannelPlaylists,
    "about": ChannelAbout
}
</script>