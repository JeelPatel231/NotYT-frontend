export default interface Popular {
  type: "shortVideo";
  title: string;
  videoId: string;
  videoThumbnails: [
    {
      quality: string;
      url: string;
      width: number;
      height: number;
    }
  ];

  lengthSeconds: number;
  viewCount: number;

  author: string;
  authorId: string;
  authorUrl: string;

  published: number;
  publishedText: string;
}
[];
