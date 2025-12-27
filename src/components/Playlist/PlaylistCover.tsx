"use client";

import { useLanguage } from '@/context/LanguageContext';
import { musicApi } from '@/services/api';
import { Playlist } from '@/types/music';
import { Disc } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PlaylistCoverProps {
  playlist: Playlist;
}

export default function PlaylistCover({ playlist }: PlaylistCoverProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;

    const fetchCover = async () => {
      if (playlist.tracks.length === 0) {
        setCoverUrl(null);
        return;
      }

      // 使用最近添加的歌曲（数组最后一个元素）
      const latestTrack = playlist.tracks[playlist.tracks.length - 1];
      
      try {
        // 使用 pic_id 获取封面。注意：API 需要 pic_id
        const res = await musicApi.getAlbumArt(latestTrack.pic_id, latestTrack.source, 300);
        if (mounted && res?.url) {
          setCoverUrl(res.url);
          setError(false);
        } else if (mounted) {
           setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch cover:', err);
        if (mounted) setError(true);
      }
    };

    fetchCover();

    return () => {
      mounted = false;
    };
  }, [playlist]); // 当 playlist 变化时（例如添加了新歌），重新获取

  if (playlist.tracks.length === 0 || error || !coverUrl) {
    return (
       <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--glass-bg)',
        borderRadius: '8px'
      }}>
        <Disc size={48} style={{ color: 'var(--text-muted)' }} />
      </div>
    );
  }

  return (
    <img 
      src={coverUrl}
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
        borderRadius: '8px',
        backgroundColor: 'var(--glass-bg)'
      }}
      alt={playlist.name}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
