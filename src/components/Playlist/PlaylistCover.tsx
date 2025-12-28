"use client";

import { useLanguage } from '@/context/LanguageContext';
import { musicApi } from '@/services/api';
import { Playlist } from '@/types/music';
import { Disc } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PlaylistCoverProps {
  playlist: Playlist;
}

export default function PlaylistCover({ playlist }: PlaylistCoverProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { t } = useLanguage();

    // Use the last added track for the cover
    const latestTrack = playlist.tracks.length > 0 ? playlist.tracks[playlist.tracks.length - 1] : null;

    useEffect(() => {
    let mounted = true;

    const fetchCover = async () => {
      // Reset state if no track
      if (!latestTrack) {
         if (mounted) setCoverUrl(null);
         return;
      }
      
      try {
        // Fetch album art using pic_id
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
  }, [latestTrack?.pic_id, latestTrack?.source]); // Depend on specific track ID/Source to prevent stale covers

  if (!playlist.tracks || playlist.tracks.length === 0 || error || !coverUrl) {
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
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <Image 
        src={coverUrl}
        alt={playlist.name}
        fill
        sizes="(max-width: 768px) 140px, 200px"
        priority={true}
        style={{ 
          objectFit: 'cover', 
          backgroundColor: 'var(--background-accent)'
        }}
        onError={() => setError(true)}
      />
    </div>
  );
}
