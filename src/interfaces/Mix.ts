export default interface Mix {
  title: string;
  mixId: string;
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
