export type Language = 'zh' | 'en' | 'ko' | 'ja';

export const translations = {
  zh: {
    sidebar: {
      home: '首页',
      search: '搜索',
      settings: '设置',
      playlists: '歌单',
      favorites: '我的收藏',
      history: '播放历史',
    },
    // ... (home, search, player kept same, just adding common and playlist)
    home: {
      title: 'MusicFall',
      subtitle: '沉浸式音乐体验',
      description: '探索无限音乐世界，享受高品质音频。',
      startListening: '开始聆听',
    },
    search: {
      placeholder: '搜索歌曲、歌手、专辑...',
      button: '搜索',
      source: '来源',
      results: '搜索结果',
      noResults: '未找到相关结果',
      loading: '搜索中...',
      selectSource: '选择音乐来源',
      tableHeaders: {
        index: '#',
        title: '标题',
        artist: '歌手',
        album: '专辑',
      },
      addToQueue: '播放',
    },
    player: {
      noTrack: '暂无播放',
      selectSong: '请选择一首歌曲',
      download: '下载',
      quality: {
        128: '标准',
        192: '较高',
        320: '极高',
        740: '无损',
        999: 'Hi-Res',
      },
    },
    common: {
      music: '音乐',
      loading: '加载中...',
      songs: '歌曲',
      recentSongs: '最近播放',
      clear: '清空',
    },
    playlist: {
      create: '创建歌单',
      name: '歌单名称',
      description: '描述',
      add: '添加',
      playAll: '播放全部',
      downloadAll: '下载全部',
    },
    theme: {
      light: '浅色',
      dark: '深色',
      system: '跟随系统',
    }
  },
  en: {
    sidebar: {
      home: 'Home',
      search: 'Search',
      settings: 'Settings',
      playlists: 'Playlists',
      favorites: 'Favorites',
      history: 'History',
    },
    home: {
      title: 'MusicFall',
      subtitle: 'Immersive Music Experience',
      description: 'Explore infinite music worlds with high-quality audio.',
      startListening: 'Start Listening',
    },
    search: {
      placeholder: 'Search songs, artists, albums...',
      button: 'Search',
      source: 'Source',
      results: 'Search Results',
      noResults: 'No results found',
      loading: 'Searching...',
      selectSource: 'Select Music Source',
      tableHeaders: {
        index: '#',
        title: 'Title',
        artist: 'Artist',
        album: 'Album',
      },
      addToQueue: 'Play',
    },
    player: {
      noTrack: 'No Track Playing',
      selectSong: 'Select a song',
      download: 'Download',
      quality: {
        128: 'Standard',
        192: 'High',
        320: 'Very High',
        740: 'Lossless',
        999: 'Hi-Res',
      },
    },
    common: {
      music: 'Music',
      loading: 'Loading...',
      songs: 'songs',
      recentSongs: 'Recently played',
      clear: 'Clear',
    },
    playlist: {
      create: 'Create Playlist',
      name: 'Playlist Name',
      description: 'Description',
      add: 'Add',
      playAll: 'Play All',
      downloadAll: 'Download All',
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    }
  },
  ko: {
    sidebar: {
      home: '홈',
      search: '검색',
      settings: '설정',
      playlists: '플레이리스트',
      favorites: '즐겨찾기',
      history: '재생 기록',
    },
    // ...
    playlist: {
      create: '플레이리스트 만들기',
      name: '플레이리스트 이름',
      description: '설명',
      add: '추가',
      playAll: '모두 재생',
      downloadAll: '모두 다운로드',
    },
    theme: {
      light: '라이트',
      dark: '다크',
      system: '시스템 설정',
    }
  },
  ja: {
    sidebar: {
      home: 'ホーム',
      search: '検索',
      settings: '設定',
      playlists: 'プレイリスト',
      favorites: 'お気に入り',
      history: '再生履歴',
    },
    // ...
    playlist: {
      create: 'プレイリストを作成',
      name: 'プレイリスト名',
      description: '説明',
      add: '追加',
      playAll: 'すべて再生',
      downloadAll: 'すべてダウンロード',
    },
    theme: {
      light: 'ライト',
      dark: 'ダーク',
      system: 'システム',
    }
  },
};
