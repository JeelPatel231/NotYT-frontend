<svelte:head>
    <title>{video_data.title}</title>
</svelte:head>
<!-- re-render everything on ID change -->
{#key video_data.videoId}        
<div class="grid-container">
    <video class="videoplayer" controls>

        <!-- merged video and audio streams -->
        {#each video_data.formatStreams.reverse() as streams}
            <source src={streams.url} type={streams.type} label={streams.qualityLabel} >
        {/each}

        <!-- proxy fallbacks -->
        <source src={`${$FINAL_HOST}/latest_version?id=${video_data.videoId}&itag=22&local=true`} >
        <source src={`${$FINAL_HOST}/latest_version?id=${video_data.videoId}&itag=18&local=true`} >

        <!-- track here just for "good practices" and svelte warning -->
        <track kind="captions">
    </video>

    <div class="description text-body2">
        <div class="mt-18 text-regular">
            {video_data.title}
        </div>
        <div class="flex-items-center mb-8">
            <div class="views">
                <div class="video-info">
                    {video_data.viewCount.toLocaleString('en-US')} views
                    •
                    {new Date(video_data.published*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            </div>
            <div class="button-bar">
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
        <span class="divider" />
        <div class="channel-info flex-items-center">
            <img class="desc-channel-img" src={video_data.authorThumbnails.at(1)?.url} alt={video_data.author}>
            <div>
                <div class="text-body2 author-title">{video_data.author}</div>
                <div class="author-subcount text-caption">{video_data.subCountText} subscribers</div>
            </div>
            <!-- BUTTON DOESNT DO ANYTHING YET -->
            <div class="subscribe">
                SUBSCRIBE
            </div>
        </div>
        <div class="desc-text" class:collapsed={collapsed}>
            {@html video_data.descriptionHtml}
        </div>
        <div class="show-more text-caption" on:click={()=>{collapsed = !collapsed}}>{collapsed ? "SHOW MORE" : "SHOW LESS"}</div>
    </div>
    <div class="related-items">
        {#each video_data.recommendedVideos as entry}
            <SingleRelatedItem {...entry} />
        {/each}
    </div>

    {#if !comments_data.error}
    <div class="comments">
        <span class="divider" />

        <div class="comment-count text-body1">
            {comments_data.commentCount} Comments
        </div>

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

.mt-18{
    margin-top: 18px;
}
.views .video-info{
    color: #606060;
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
    margin-left: 66px;
}
.channel-info{
    margin: 16px 0;
}
.desc-channel-img{
    height: 48px;
    width: 48px;
    border-radius: 24px;
    margin-right: 16px;
}
.author-title{
    font-weight: 600;
    margin-bottom: 4px;
}
.author-subcount{
    color: #606060;
}
:global(.description a){
    color: #065fd4;
}

.comments{
    grid-area: comments;
}
.comment-count{
    margin-top: 24px;
    margin-bottom: 24px;
}
.desc-text{
    display: flex;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    position: relative;
    flex-grow: 1;
}

.desc-text.collapsed{
    -webkit-line-clamp: 3;
}

.subscribe{
    background-color: #cc0000;
    color: #fff;
    font-weight: bold;
    padding: 10px 16px;
    margin-left: auto;
}

.show-more{
    text-transform: uppercase;
    font-weight: 700;
    cursor:pointer;
    margin:8px 0 0 66px;
    color: #606060;
}

.button-bar{
    display: flex;
    align-self: flex-start;
    margin-left: auto;
    color: #606060;
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