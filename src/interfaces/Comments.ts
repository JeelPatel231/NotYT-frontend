export interface TypeComment{
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
}

export interface TypeVideoComments {
  commentCount: number | null;
  videoId: string;
  comments: TypeComment[];
  continuation: string | null;

  // when error
  error:string|null;
}
