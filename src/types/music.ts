export type MusicSource = 
  | 'netease' 
  | 'tencent' 
  | 'tidal' 
  | 'spotify' 
  | 'ytmusic' 
  | 'qobuz' 
  | 'joox' 
  | 'deezer' 
  | 'migu' 
  | 'kugou' 
  | 'kuwo' 
  | 'ximalaya' 
  | 'apple';

export interface SearchResult {
  id: string; // track_id
  name: string;
  artist: string[];
  album: string;
  pic_id: string;
  url_id: string; // deprecated
  lyric_id: string;
  source: MusicSource;
}

export interface SearchResponse {
  list: SearchResult[];
  total: number;
  type: string;
}

export interface MusicUrlResponse {
  url: string;
  br: number;
  size: number;
}

export interface AlbumArtResponse {
  url: string;
}

export interface LyricResponse {
  lyric: string;
  tlyric?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  tracks: SearchResult[];
  createdAt: number;
}
