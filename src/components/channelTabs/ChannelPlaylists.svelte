<script lang="ts">
  import type TypeChannelPlaylist from "src/interfaces/ChannelPlaylist";
  export let data: TypeChannelPlaylist;
</script>

<div class="playlist-container">
  {#each data.playlists as playlist (playlist.playlistId)}
    <a href={`/playlist?list=${playlist.playlistId}`}>
      <div class="playlist-entry">
        <div class="img-holder">
          <img
            class="playlist-image"
            src={playlist.playlistThumbnail}
            alt={playlist.title}
          />
          <span class="videocount text-headline5">
            {playlist.videoCount}
            <span class="material-icons">playlist_play</span>
          </span>
        </div>
        <div class="title text-body2">
          {playlist.title}
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  /* TODO: USE GRID */
  .playlist-container {
    padding-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .img-holder {
    position: relative;
  }
  .videocount {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 40%;
    opacity: 0.8;
    background: black;
    color: white;
    top: 0;
    right: 0;
  }
  .playlist-image {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 16/9;
  }
  .playlist-entry {
    position: relative;
    width: 200px;
  }
  .title {
    margin-top: 8px;
    margin-bottom: 16px;
  }
</style>
