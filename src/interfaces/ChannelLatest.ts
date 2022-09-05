export default interface TypeChannelLatest {
  title: string;
  videoId: string;
  authorId: string;
  authorUrl: string;

  videoThumbnails: [
    {
      quality: string;
      url: string;
      width: number;
      height: number;
    }
  ];
  description: string;
  descriptionHtml: string;

  viewCount: number;
  published: number;
  publishedText: string;
  lengthSeconds: number;
  paid: boolean;
  premium: boolean;
};
