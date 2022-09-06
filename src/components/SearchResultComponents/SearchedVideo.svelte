<a href={`/watch?v=${data.videoId}`}>
<div class="card m-t-8">
    <div class="thumb-wrapper">
        <img src={`/proxy/images/${data.videoId}`} alt={data.title} class="thumbnail">
        <div class="duration">{durationConverter(data.lengthSeconds)}</div>
    </div>
    <div class="content">
        <div class="video-title">
            {data.title}
        </div>
        <div class="m-t-8">
            {data.viewCount} • {data.publishedText}
        </div>
        <div class="channel-info m-t-8" class:verified={data.paid}>
            <!-- INVIDIOUS DOESNT PROVIDE CHANNEL AVATARS IN THIS RESPONSE -->
            <!-- <img src={} alt={} class="channel-icon"> -->
            {data.author}
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

    position: relative;
    font-size: 1.4rem;
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
.channel-info{
    display: flex;
    align-items: center;
}
.verified::after{
    content: "check";
    font-family: "Material Icons";
    margin-left: 4px;
    background: var(--subtitle-text);
    border-radius: 100px;
    padding: 2px;
    font-size: 8px;
    font-weight: bold;
    color: var(--background);
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
import type { TypeSearchedVideo } from "src/interfaces/Search";
import { durationConverter } from "../../store/utils/functions";
export let data:TypeSearchedVideo;

</script>