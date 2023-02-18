<script lang="ts">
  import type TypeChannelPlaylist from "src/interfaces/ChannelPlaylist";
  export let data: TypeChannelPlaylist;
</script>

<div class="playlist-container">
  {#each data.playlists as playlist (playlist.playlistId)}
    <div class="playlist-entry">
      <!-- {JSON.stringify(playlist)} -->
      <img
        class="playlist-image"
        src={playlist.playlistThumbnail}
        alt={playlist.title}
      />
      <div class="title text-body2">
        {playlist.title}
      </div>
    </div>
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
