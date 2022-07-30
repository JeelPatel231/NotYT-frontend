/*
ChannelSearch = [
    ChannelSearchedVideo,
    ChannelSearchedPlaylist,
    ChannelSearchedChannel
]

AKA

ChannelSearch = (ChannelSearchedVideo | ChannelSearchedPlaylist | ChannelSearchedChannel)[]
*/

export interface ChannelSearchedVideo {
  type: "video";
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

export interface ChannelSearchedPlaylist {
  type: "playlist";
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

export interface ChannelSearchedChannel {
  type: "channel";
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
