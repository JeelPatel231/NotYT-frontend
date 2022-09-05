<svelte:head>
    <title>{data.video_data.title}</title>
</svelte:head>
<!-- re-render everything on ID change -->
{#key data.video_data.videoId}        
<div class="grid-container">
    <video class="videoplayer" controls>

        <!-- merged video and audio streams -->
        {#each data.video_data.formatStreams.reverse() as streams}
            <source src={streams.url} type={streams.type} label={streams.qualityLabel} >
        {/each}

        <!-- proxy fallbacks -->
        <source src={`${$FINAL_HOST}/latest_version?id=${data.video_data.videoId}&itag=22&local=true`} >
        <source src={`${$FINAL_HOST}/latest_version?id=${data.video_data.videoId}&itag=18&local=true`} >

        <!-- track here just for "good practices" and svelte warning -->
        <track kind="captions">
    </video>

    <div class="description text-body2">
        <div class="mt-18 text-regular">
            {data.video_data.title}
        </div>
        <div class="flex-items-center mb-8">
            <div class="views">
                <div class="video-info">
                    {data.video_data.viewCount.toLocaleString('en-US')} views
                    •
                    {new Date(data.video_data.published*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            </div>
            <div class="button-bar">
                <div class="like btn">
                    <span class="material-icons">thumb_up</span>
                    <span>{nFormatter(data.video_data.likeCount)}</span>
                </div>
                <div class="share btn">
                    <span class="material-icons" style="transform: scaleX(-1);">reply</span>
                    <span>Share</span>
                </div>
            </div>
        </div>
        <span class="divider" />
        <div class="channel-info flex-items-center">
            <img class="desc-channel-img" src={data.video_data.authorThumbnails.at(1)?.url} alt={data.video_data.author}>
            <div>
                <a href={data.video_data.authorUrl} class="text-body2 author-title">{data.video_data.author}</a>
                <div class="author-subcount text-caption">{data.video_data.subCountText} subscribers</div>
            </div>
            <!-- BUTTON DOESNT DO ANYTHING YET -->
            <div class="subscribe">
                SUBSCRIBE
            </div>
        </div>
        <div class="desc-text" class:collapsed={collapsed}>
            {@html data.video_data.descriptionHtml}
        </div>
        <div class="show-more text-caption" on:click={()=>{collapsed = !collapsed}}>{collapsed ? "SHOW MORE" : "SHOW LESS"}</div>
    </div>
    <div class="related-items">
        {#each data.video_data.recommendedVideos as entry}
            <SingleRelatedItem {...entry} />
        {/each}
    </div>

    {#if !data.comments_data.error}
    <div class="comments">
        <span class="divider" />

        <div class="comment-count text-body1">
            {data.comments_data.commentCount} Comments
        </div>

        {#each data.comments_data.comments as comment}
            <Comment comment={comment} videoId={data.comments_data.videoId}/>
        {/each}
        
        <!-- load button if more replies exist  -->
        {#if !!data.continuation}
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
    color: var(--subtitle-text);
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
    font-weight: 500;
    margin-bottom: 4px;
    color: var(--bg-invert);
}
.author-subcount{
    color: var(--subtitle-text);
}
:global(.description a){
    color: var(--blue);
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
    background-color: var(--red);
    color: #fff; /*leave it hardcoded */
    font-weight: bold;
    padding: 10px 16px;
    margin-left: auto;
}

.show-more{
    text-transform: uppercase;
    font-weight: 700;
    cursor:pointer;
    margin:8px 0 0 66px;
    color: var(--subtitle-text);
}

.button-bar{
    display: flex;
    align-self: flex-start;
    margin-left: auto;
    color: var(--subtitle-text);
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

<script lang="ts">
import { get } from "svelte/store";
import { FINAL_HOST } from "../../store/store";
import Comment from "../../components/comment.svelte";
import { nFormatter } from "../../store/utils/functions";
import SingleRelatedItem from "../../components/singleRelatedItem.svelte";
import type Video from "src/interfaces/Videos";
import type {TypeVideoComments} from "src/interfaces/Comments";

export let data:{
    video_data:Video,
    comments_data:TypeVideoComments,
    continuation:string,
}
let collapsed = true;

const loadMoreComments = () => {
    let url = `${get(FINAL_HOST)}/api/v1/comments/${data.video_data.videoId}`;

    !!data.continuation ? url += `?continuation=${data.continuation}` : ''
    
    fetch(url).then(x=>x.json())
    .then(x=>{
        data.comments_data.comments = [...data.comments_data.comments,...x.comments]
        data.continuation = x.continuation
    })
}

</script>