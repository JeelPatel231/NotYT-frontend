<a href={`/channel/${data.authorId}`}>
<div class="card m-t-8 channel">
    <div class="thumb-wrapper">
        <img src={data.authorThumbnails[0].url} alt={data.author} class="thumbnail">
    </div>
    <div class="content">
        <div class="video-title">
            {data.author}
        </div>
        <div class="m-t-8">
            {data.subCount} • {data.videoCount} videos
        </div>
        <div class="description m-t-8">
            {@html data.descriptionHtml}
        </div>
        <!-- 6 days = new, 7 days != new -->
    </div>
</div>
</a>

<style>
.card{
    max-width: 1096px;
    display:grid;
    grid-template-columns: 360px minmax(200px,auto);
}
.thumbnail{
    height: 100%;
    width: 100%;
    object-fit: contain;
}
.thumb-wrapper{
    /* 0 min-height-width prevents grid-overflow */
    min-height: 0;
    min-width: 0;

    max-height: 202px;
    display: flex;
    justify-content: center;
}
.content{
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    color: var(--subtitle-text);
    font-size: 1.2rem;
}
.m-t-8{
    margin-top: 8px;
}
.video-title{
    color: var(--bg-invert);
    font-size: 1.8rem;
}
.channel{
    height: 136px;
}
.channel .content{
    justify-content: center;
}
.channel .thumbnail{
    width: fit-content;
    border-radius: 100%;
}

@media only screen and (max-width:700px){
    .card{
        grid-template-columns: 200px auto;
    }
    .video-title{
        font-size: 1.4rem;
    }
    .thumb-wrapper{
        max-height: 113px;
    }
    .description{
        display: none;
    }
}
</style>

<script lang="ts">
import type { TypeSearchedChannel } from "src/interfaces/Search";
export let data:TypeSearchedChannel;
</script>