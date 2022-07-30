/*
Search = [
    SearchedVideo,
    SearchedPlaylist,
    SearchedChannel
]

AKA

Search = (SearchedVideo | SearchedPlaylist | Searched)[]
*/


export interface TypeSearchedVideo {
  type: string;
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
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
}

export interface TypeSearchedPlaylist {
  type: string;
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
}

export interface TypeSearchedChannel {
  type: string;
  author: string;
  authorId: string;
  authorUrl: string;

  authorThumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
  subCount: number;
  videoCount: number;
  description: string;
  descriptionHtml: string;
}
