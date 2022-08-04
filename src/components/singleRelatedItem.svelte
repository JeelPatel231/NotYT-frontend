<a href={`/watch?v=${videoId}`}>
    <div class="related-item">
        <div class="thumbnail">
            <img class="video-thumb" src={`/proxy/images/${videoId}`} alt={title}>
            <span class="duration text-caption">{durationConverter(lengthSeconds)}</span>
        </div>
        <div class="content">
            <div class="title text-body2">
                {title}
            </div>
            <div class="info">
                <a href={authorUrl}>
                    <div class="channel-name text-caption">
                        {author}
                    </div>
                </a>
                <div class="status-block text-caption">
                    {viewCountText} views
                </div>
            </div>
        </div>
    </div>
</a>

<style>
.related-item{
    display: flex;
    margin-bottom: 8px;
}
.thumbnail{
    position: relative;
    margin-right: 8px;
    width: 172px;
}
.video-thumb{
    height: 100%;
    width: 172px;
}
.duration{
    position: absolute;
    margin: 8px 4px;
    padding: 4px;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 2px;
}
.content{
    display: flex;
    flex-direction: column;
}
.title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 20px;
    margin-bottom: 4px;
}
.channel-name{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
.channel-name:hover{
    color: #000;
}
.info{
    color: #666;
    margin-bottom: 2px;
}
</style>

<!-- svelte-ignore unused-export-let -->
<script lang="ts">
import { durationConverter } from "../store/utils/functions";

export let videoId: string;
export let title: string;
export let videoThumbnails: {
                quality: string;
                url: string;
                width: number;
                height: number;
            }[];
export let author: string;
export let lengthSeconds: number;
export let viewCountText: string;
export let viewCount:number;
export let authorUrl:string;
export let authorId:string;

// TODO: PLAYLIST OVERLAY WITH STREAM COUNT
</script>
