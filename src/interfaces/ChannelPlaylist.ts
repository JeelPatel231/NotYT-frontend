export default interface TypeChannelPlaylist {
  playlists: {
    title: string;
    playlistId: string;
    author: string;
    authorId: string;
    authorUrl: string;
    videoCount: number;
    videos: {
      title: string;
      videoId: string;
      lengthSeconds: number;
      videoThumbnails: {
        quality: string;
        url: string;
        width: number;
        height: number;
      }[];
    }[];
  }[];
  continuation: string | null;
}
