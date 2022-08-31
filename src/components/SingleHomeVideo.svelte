<div class="videos">
    <a href={`/watch?v=${data.videoId}`}>
        <div class="image-container">
            <img src={`/proxy/images/${data.videoId}`} alt={data.title}>
            <div class="duration text-caption">
                {durationConverter(data.lengthSeconds)}
            </div>
        </div>
        <div class="text-body2 title">
            {data.title}
        </div>
        </a>
        <a href={data.authorUrl}>
            <!-- INVIDIOUS DOESNT PROVIDE CHANNEL THUMBNAIL -->
            <div class="text-caption info">
                {data.author}
            </div>
        </a>
    <a href={`/watch?v=${data.videoId}`}>
        <div class="text-caption info">
            {nFormatter(data.viewCount)} • {data.publishedText}
        </div>
    </a>
</div>

<style>
.videos{
    /* min-content sets the width to width of image */
    width: min-content;
    margin: 0 8px;
    margin-top: 8px;
}
.image-container{
    position: relative;
    width: 320px;
    height: 180px;
}
.title{
    margin: 12px 0 6px 0;
    font-weight: 500;
}
.info{
    color: #606060;
    line-height: 1.8rem;
}
</style>

<script lang="ts">
import { durationConverter, nFormatter } from "../store/utils/functions";
import type Popular from "../interfaces/Popular"

export let data:Popular;
</script>