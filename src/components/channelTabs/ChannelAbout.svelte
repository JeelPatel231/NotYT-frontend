<div class="about-container">
    <div class="description mtb-8">
        <div class="text-body1 mtb-8">Description</div>
        <div class="text-body2">
            {@html data.descriptionHtml}
        </div>
    </div>
    <hr>
    {#if data.relatedChannels.length > 0}
    <div class="related-channels mtb-8">
        <div class="text-body1 mtb-8">Related Channels</div>
        {#each data.relatedChannels as entry}
            <a href={`/channel/${entry.authorId}`}>    
                <div class="channel">
                    <img src={entry.authorThumbnails[0].url} alt={entry.author}>
                    <div class="related-channel-name text-body2">
                        {entry.author}
                    </div>
                </div>
            </a>    
        {/each}
    </div>
    <hr>
    {/if}
    <div class="stats mtb-8">
        <div class="text-body1 mtb-8">Stats</div>
        <div class="text-body2">
            Joined {new Date(data.joined*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}
            <br>
            {data.totalViews.toLocaleString('en-US')} views
        </div>
    </div>
</div>

<style>
.text-body1{
    font-weight: 500;
}
.mtb-8{
    margin-top: 8px;
    margin-bottom: 8px;
}
.description .text-body2{
    white-space: pre-line;
}
.channel{
    display: flex;
    align-items: center;
    margin-top: 8px;
}
.channel img{
    border-radius: 40px;
}
.related-channel-name{
    margin-left: 4px;
}
</style>

<script lang="ts">
import type Channels from "src/interfaces/Channels";
export let data:Channels;
</script>