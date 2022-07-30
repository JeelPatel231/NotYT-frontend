<a href={`/playlist?list=${data.playlistId}`}>
<div class="card m-t-8">
    <div class="thumb-wrapper">
        <img src={data.videos[0].videoThumbnails[0].url} alt={data.title} class="thumbnail">
    </div>
    <div class="content">
        <div class="video-title">
            {data.title}
        </div>
        <div class="m-t-8">
            {data.videoCount}
        </div>
        <div class="channel-info m-t-8">
            <!-- <img src={} alt={} class="channel-icon"> -->
            {data.author}
        </div>
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
    color: #606060;
    font-size: 1.2rem;
}
.m-t-8{
    margin-top: 8px;
}
.video-title{
    color: #000000;
    font-size: 1.8rem;
}
.channel-info{
    display: flex;
    align-items: center;
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
}
</style>

<script lang="ts">
import type { TypeSearchedPlaylist } from "src/interfaces/Search";

export let data:TypeSearchedPlaylist;

// TODO: PLAYLIST OVERLAY WITH STREAM COUNT
</script>