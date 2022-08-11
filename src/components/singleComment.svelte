<div class="comment-flex-container">
    <div class="avatarContainer">
        <img class="uploaderAvatarUrl" alt={comment.author} src={comment.authorThumbnails[0].url} >
    </div>
    <div class="dataContainer">
        <!-- INVIDIOUS DOESNT PROVIDE IF COMMENT IS PINNED -->
        <div class="flex-items-center uploaderName">
            {comment.author}<span class="upload-date">{comment.publishedText}</span>
        </div>
        <div class:collapsed={collapsed} bind:this={commentTextContainer} class="commentText">
            {@html comment.contentHtml}
        </div>
        {#if overflowedComment}
            <div on:click={()=>{collapsed=!collapsed}} class="showmore">
                {collapsed ? "Read more" : "Show less"}
            </div>
        {/if}
        <div class="commentBar">
            <span class="material-icons">
                thumb_up_off_alt
            </span>
            { nFormatter(comment.likeCount)}
            <div class="hearted"></div>
        </div>        
    </div>
</div>

<script lang="ts">
import type { TypeComment } from "src/interfaces/Comments";
import { nFormatter } from "../store/utils/functions";

import { onMount } from "svelte";

export let comment:TypeComment;

let collapsed = true;
let commentTextContainer: HTMLElement;
let overflowedComment = false;

onMount(()=>{
    if(commentTextContainer.offsetHeight != commentTextContainer.scrollHeight){
        overflowedComment = true;
    }
})

</script>

<style>
.comment-flex-container{
    display: flex;
    margin-top: 16px;
}
.dataContainer{
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.uploaderAvatarUrl{
    height: 40px;
    width: 40px;
    margin-right: 16px;
    display: flex;
    border-radius: 100%;
    overflow: hidden;
}
.uploaderName{
    line-height: 1.8rem;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.015rem;
    max-width: 0; /*prevents grid overflow*/
    white-space: pre;
}
.upload-date{
    font-size: 1rem;
    color:#606060;
    margin-left: 8px;
    font-weight: 400;
}
.commentText{
    white-space: pre-line;
    margin:4px 0;
    line-height: 1.8rem;
}
.commentBar{
    display: flex;
    align-items: center;
    margin: 8px 0;
}
.commentBar > *{
    margin-right:8px;
}
/* IF COMMENT IS PINNED, the chip component */
/* .pinned-chip{
    display: flex;
    align-items: center;
    margin: 4px 0;
}
.pinned-chip > span{
    padding: 0 4px 0 0;
} */
.collapsed{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
.showmore{
    cursor: pointer;
}
.showmore:hover{
    text-decoration: underline;
}
</style>
