export default interface TypeChannelComments {
  authorId: string;
  comments: [
    {
      author: string;
      authorThumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
      authorId: string;
      authorUrl: string;
      isEdited: boolean;
      content: string;
      contentHtml: string;
      published: number;
      publishedText: string;
      likeCount: number;
      commentId: string;
      authorIsChannelOwner: boolean;
      creatorHeart: {
        creatorThumbnail: string;
        creatorName: string;
      } | null;
      replies: {
        replyCount: number;
        continuation: string;
      } | null;
      attachment: AttachmentImage | AttachmentVideo | AttachmentUnknown | null;
    }
  ];
  continuation: string | null;
}

interface AttachmentImage {
  type: "image";
  imageThumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
}

interface AttachmentVideo {
  type: "video";
  title: string;
  videoId: string;
  videoThumbnails: {
    quality: string;
    url: string;
    width: number;
    height: number;
  }[];
  lengthSeconds: number;
  author: string;
  authorId: string;
  authorUrl: string;
  published: number;
  publishedText: string;
  viewCount: number;
  viewCountText: string;
}

interface AttachmentUnknown {
  type: "unknown";
  error: "Unrecognized attachment type.";
}
