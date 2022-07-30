export default interface Playlist {
  title: string;
  playlistId: string;

  author: string;
  authorId: string;
  authorThumbnails: {
    url: string;
    width: string;
    height: string;
  }[];
  description: string;
  descriptionHtml: string;

  videoCount: number;
  viewCount: number;
  updated: number;

  videos: {
    title: string;
    videoId: string;
    author: string;
    authorId: string;
    authorUrl: string;

    videoThumbnails: {
      quality: string;
      url: string;
      width: number;
      height: number;
    }[];
    index: number;
    lengthSeconds: number;
  }[];
}
