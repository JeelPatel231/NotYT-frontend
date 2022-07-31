<div class="text-body2 comment-wrapper">
    <!-- PARENT COMMENT -->
    <SingleComment {comment}/>


    <div on:click={showReplies} class="showreplies flex-items-center">
        <!-- if toggle is true, and if replies exists -->
        {#if !repliesShown && comment.replies }
            <span class="material-icons">
                arrow_drop_down
            </span>
            Show replies
        <!-- if toggle is on and dont show if replies dont exist -->
        {:else if repliesShown}
        <span class="material-icons">
            arrow_drop_up
        </span>
            Hide replies
        {/if}
    </div>
    <!-- REPLIES TO PARENT COMMENT -->
    <!-- if toggle is true, and if replies exists -->
    {#if repliesShown && comment.replies }
    <div class="spaced">
        {#each replies as reply}
            <SingleComment comment={reply}/>
        {/each}
        <!-- load button is more replies exist -->
        {#if !!repliesDataNext}
            <div on:click={loadmore}>Show More</div>
        {/if}
    </div>
    <span class="seperatorbar" />
    {/if}
</div>

<script lang="ts">
import type {TypeComment} from "src/interfaces/Comments";

import { get } from "svelte/store";
import { FINAL_HOST } from "../store/store";
import SingleComment from "./singleComment.svelte";

export let comment:TypeComment; // passed comment object
export let videoId:string; // passed video id of yt video
let firstClick = true;
let replies:TypeComment[] = [] // array of replies
let repliesShown = false // replies shown or not, boolean toggle
let repliesDataNext = comment.replies?.continuation; // get replies object from passed comment object

// toggle to show and hide replies
// trigger load more if first click else just show/hide
const showReplies = () => {
    repliesShown = !repliesShown
    if(firstClick){
        firstClick = false;
        loadmore()
    }
}

// fetch next set of replies using nextPage object
const loadmore = () => {
    let url = `${get(FINAL_HOST)}/api/v1/comments/${videoId}`;

    !!repliesDataNext ? url += `?continuation=${repliesDataNext}` : ''
    
    fetch(url).then(x=>x.json())
    .then(x=>{
        replies = [...replies,...x.comments]
        repliesDataNext = x.continuation
    })
}
</script>

<style>
.comment-wrapper{
    margin-top: 18px;
}
.showreplies{
    margin-left:56px;
    color: #065fd4;
    font-weight: 700;
}
.showreplies .material-icons{
    font-size: 24px;
}
.spaced{
    margin-left: 60px;
}
.seperatorbar{
    margin-bottom: 32px;
    display: block;
}
</style>
