"use client";

import AddToPlaylistModal from '@/components/Playlist/AddToPlaylistModal';
import { useLanguage } from '@/context/LanguageContext';
import { useLibrary } from '@/context/LibraryContext';
import { usePlayer } from '@/context/PlayerContext';
import { SearchResult } from '@/types/music';
import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';
import styles from './SongList.module.css';

interface SongListProps {
  songs: SearchResult[];
}

export default function SongList({ songs }: SongListProps) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const { toggleFavorite, isFavorite } = useLibrary(); // Assume we also want Favorite button?
  const { t } = useLanguage();
  const [trackToAdd, setTrackToAdd] = useState<SearchResult | null>(null);

  return (
    <div className={styles.listContainer}>
      <div className={styles.songRow} style={{ cursor: 'default', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <span className={styles.index}>{t('search.tableHeaders.index')}</span>
        <span>{t('search.tableHeaders.title')}</span>
        <span>{t('search.tableHeaders.artist')}</span>
        <span>{t('search.tableHeaders.album')}</span>
        <span style={{ width: 40 }}></span>
      </div>
      
      {songs.map((song, idx) => {
        const isActive = currentTrack?.id === song.id;
        const liked = isFavorite(song.id);
        
        return (
          <div 
            key={song.id} 
            className={`${styles.songRow} ${isActive ? styles.active : ''}`}
            onClick={() => playTrack(song)}
          >
            <span className={styles.index}>
               {isActive && isPlaying ? (
                 <div className={styles.playingIndicator}>
                   <span /><span /><span />
                 </div>
               ) : idx + 1}
            </span>
            <div className={styles.titleCol}>
              <span className={styles.songName}>{song.name}</span>
            </div>
            <span className={styles.artist}>{song.artist.join(', ')}</span>
            <span className={styles.album}>{song.album}</span>
            
            <div className={styles.actions} onClick={e => e.stopPropagation()}>
               <button 
                onClick={() => toggleFavorite(song)}
                className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                title={t('sidebar.favorites')}
               >
                 <Heart size={16} fill={liked ? "currentColor" : "none"} />
               </button>
               <button 
                onClick={() => setTrackToAdd(song)}
                className={styles.actionBtn}
                title={t('playlist.add')}
               >
                 <Plus size={16} />
               </button>
            </div>
          </div>
        );
      })}

      {trackToAdd && (
        <AddToPlaylistModal 
          track={trackToAdd} 
          onClose={() => setTrackToAdd(null)} 
        />
      )}
    </div>
  );
}
