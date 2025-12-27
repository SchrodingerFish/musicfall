import { AlbumArtResponse, LyricResponse, MusicSource, MusicUrlResponse, SearchResult } from '@/types/music';

const API_BASE_URL = 'https://music-api.gdstudio.xyz/api.php';

async function fetchAPI<T>(params: Record<string, string | number>): Promise<T> {
  const url = new URL(API_BASE_URL);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, String(params[key]));
    }
  });
  
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
       // Log error but allow caller to handle it
       console.warn(`API Error: ${response.status} ${response.statusText}`);
       throw new Error(`API call failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export const musicApi = {
  search: async (
    keyword: string, 
    source: MusicSource = 'netease', 
    page: number = 1, 
    count: number = 20
  ): Promise<SearchResult[]> => {
    // Note: The API returns the array directly for 'search' type usually, or inside a wrapper.
    // Based on user description: "返回：id...name...". It likely returns a JSON list.
    // Let's assume it returns an array of objects.
    const data = await fetchAPI<SearchResult[]>({
      types: 'search',
      source,
      name: keyword,
      count,
      pages: page
    });
    return data;
  },

  getMusicUrl: async (
    id: string, 
    source: MusicSource, 
    br: 128 | 192 | 320 | 740 | 999 = 999
  ): Promise<MusicUrlResponse> => {
    return fetchAPI<MusicUrlResponse>({
      types: 'url',
      source,
      id,
      br
    });
  },

  getAlbumArt: async (
    id: string, 
    source: MusicSource, 
    size: 300 | 500 = 500
  ): Promise<AlbumArtResponse> => {
    return fetchAPI<AlbumArtResponse>({
      types: 'pic',
      source,
      id,
      size
    });
  },

  getLyric: async (
    id: string, 
    source: MusicSource
  ): Promise<LyricResponse> => {
    return fetchAPI<LyricResponse>({
      types: 'lyric',
      source,
      id
    });
  }
};
