<div class="video-container">
    {#each data as entry}
    <a href={`/watch?v=${entry.videoId}`}>
        <div class="video-card">
            <div class="thumbnail text-body2">
                <img src={`/proxy/images/${entry.videoId}`} alt={entry.title}>
                <div class="duration">
                    {durationConverter(entry.lengthSeconds)}
                </div>
            </div>
            <div class="title text-body2">
                {entry.title}
            </div>
            <div class="text-caption">
                {entry.viewCount} • {entry.publishedText} 
            </div>
        </div>
    </a>
    {/each}
</div>
    

<style>
.video-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.video-card{
    width: 220px;
    margin-top: 8px;
    margin-right: 8px;
}
.title{
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.text-caption{
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.8);
}
.thumbnail{
    position: relative;
}
.thumbnail img{
    height: 100%;
    width: 100%;
    object-fit: contain;
}
</style>

<script lang="ts">
import type TypeChannelLatest from "src/interfaces/ChannelLatest";
import { durationConverter } from "../../store/utils/functions";
export let data: TypeChannelLatest[];
</script>