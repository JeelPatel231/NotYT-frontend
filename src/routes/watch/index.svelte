<!-- re-render everything on ID change -->
{#key video_data.videoId}        
<div class="grid-container">
    <video class="videoplayer" controls>

        <!-- merged video and audio streams -->
        {#each video_data.formatStreams as streams}
            <source src={streams.url} type={streams.type} label={streams.qualityLabel} >
        {/each}

        <!-- proxy fallbacks -->
        <source src={`${$FINAL_HOST}/latest_version?id=${video_data.videoId}&itag=22&local=true`} >
        <source src={`${$FINAL_HOST}/latest_version?id=${video_data.videoId}&itag=18&local=true`} >

        <!-- track here just for "good practices" and svelte warning -->
        <track kind="captions">
    </video>

    <div class="description text-body2">
            <div class="mt-16 text-headline6">
                {video_data.title}
            </div>
            <div class="flex">
                <div class="views mt-16" class:collapsed={collapsed}>
                    <div class="video-info">
                        {video_data.viewCount.toLocaleString('en-US')} views
                        •
                        {video_data.publishedText}
                    </div>
                    <div class="desc-text">
                        {@html video_data.descriptionHtml}
                    </div>
                </div>
                <div class="button-bar mt-16">
                    <div class="like btn">
                        <span class="material-icons">thumb_up</span>
                        <span>{nFormatter(video_data.likeCount)}</span>
                    </div>
                    <div class="share btn">
                        <span class="material-icons" style="transform: scaleX(-1);">reply</span>
                        <span>Share</span>
                    </div>
                </div>
            </div>
            <div class="show-more" on:click={()=>{collapsed = !collapsed}}>{collapsed ? "SHOW MORE" : "SHOW LESS"}</div>
    </div>

    <div class="related-items">
        {#each video_data.recommendedVideos as entry}
            <SingleRelatedItem {...entry} />
        {/each}
    </div>

    {#if !comments_data.error}
    <div class="comments">
        {#each comments_data.comments as comment}
            <Comment comment={comment} videoId={comments_data.videoId}/>
        {/each}
        
        <!-- load button if more replies exist  -->
        {#if !!continuation}
            <div on:click={loadMoreComments}>Load More</div>
        {/if}
    </div>
    {/if}
</div>
{/key}

<style>
.grid-container {
  padding: 24px;
  display: grid;
  column-gap: 24px;
  max-width: 1754px;
  margin: 0 auto;
  grid-template:
        "videoplayer related" min-content
        "description related" min-content
        "comments related" max-content/
        auto minmax(300px,400px);
}
@media only screen and (max-width: 1034px) {
    .grid-container {
        grid-template:
            "videoplayer"
            "description"
            "related"
            "comments";
    }
}

.videoplayer {
    width: 100%;
    grid-area: videoplayer;
    /* for sqaure videos which overflow */
    max-height: 800px;
}

.mt-16{
    margin-top: 16px;
}
.views .video-info{
    font-weight: 600;
    margin-bottom: 8px;
}
.related-items{
    grid-area: related;
}
.description{
    margin-bottom: 18px;
    grid-area: description;
}

.desc-text{
    white-space: pre-line;
    word-break: break-word;
    line-height: 20px;
}

:global(.description a){
    color: #065fd4;
}

.comments{
    grid-area: comments;
}
.flex{
    display: flex;
}
.flex .views{
    display: flex;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    position: relative;
    flex-grow: 1;
}

.flex .views.collapsed{
    -webkit-line-clamp: 3;
}

.show-more{
    text-transform: uppercase;
    font-weight: 700;
    cursor:pointer;
    margin-top: 8px;
}

.button-bar{
    min-width: 250px;
    display: flex;
    align-self: flex-start;
}
.button-bar .btn{
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight: 700;
    margin-right: 8px;
}
.button-bar > * {
    flex-grow: 0;
}
.button-bar .material-icons{
    font-size: 24px;
    margin: 8px;
}
@media only screen and (max-width: 700px) {
    .flex{
        flex-direction: column-reverse;
    }
}
</style>

<script context="module">
export const load = async ({ fetch, url }) => {
    const videoId = url.searchParams.get('v')
    const video_res = await fetch(`${get(FINAL_HOST)}/api/v1/videos/${videoId}`);
    const comments_res = await fetch(`${get(FINAL_HOST)}/api/v1/comments/${videoId}`);

    const video_data = await video_res.json();
    const comments_data = await comments_res.json();
    

    return{
        props:{
            video_data,
            comments_data,
            continuation: comments_data.continuation,
        }
    }
}
</script>

<script lang="ts">
import {  FINAL_HOST } from "../../store/store";
import { get } from "svelte/store";
import Comment from "../../components/comment.svelte";
import { nFormatter } from "../../store/utils/functions";
import SingleRelatedItem from "../../components/singleRelatedItem.svelte";
import type Video from "src/interfaces/Videos";
import type {TypeVideoComments} from "src/interfaces/Comments";

export let video_data:Video;
export let comments_data:TypeVideoComments;
export let continuation:string;
let collapsed = true;

const loadMoreComments = () => {
    let url = `${get(FINAL_HOST)}/api/v1/comments/${video_data.videoId}`;

    !!continuation ? url += `?continuation=${continuation}` : ''
    
    fetch(url).then(x=>x.json())
    .then(x=>{
        comments_data.comments = [...comments_data.comments,...x.comments]
        continuation = x.continuation
    })
}

</script>