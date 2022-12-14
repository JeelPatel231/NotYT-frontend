export default interface TypeChannel {
  author: string;
  authorId: string;
  authorUrl: string;
  authorBanners: {
    url: string;
    width: number;
    height: number;
  }[];
  authorThumbnails: {
    url: string;
    width: number;
    height: number;
  }[];

  subCount: number;
  totalViews: number;
  joined: number;

  paid: boolean;
  autoGenerated: boolean;
  isFamilyFriendly: boolean;
  description: string;
  descriptionHtml: string;
  allowedRegions: string[];

  latestVideos: {
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
    description: string;
    descriptionHtml: string;
    viewCount: number;
    published: number;
    publishedText: string;
    lengthSeconds: number;
    paid: boolean;
    premium: boolean;
  }[];
  relatedChannels: {
    author: string;
    authorId: string;
    authorUrl: string;
    authorThumbnails: {
      url: string;
      width: number;
      height: number;
    }[];
  }[];
}
