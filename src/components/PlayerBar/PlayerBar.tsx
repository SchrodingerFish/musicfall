"use client";

import { useLanguage } from '@/context/LanguageContext';
import { AudioQuality, usePlayer } from '@/context/PlayerContext';
import { musicApi } from '@/services/api';
import { Download, Music, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styles from './PlayerBar.module.css';

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, currentTime, duration, seek, volume, setVolume, toggleExpanded, quality, setQuality, downloadTrack } = usePlayer();
  const { t } = useLanguage();
  const [picUrl, setPicUrl] = useState<string>('');

  useEffect(() => {
    setPicUrl(''); // Reset immediately on track change
    if (currentTrack && currentTrack.pic_id) {
         musicApi.getAlbumArt(currentTrack.pic_id, currentTrack.source, 500)
            .then(res => {
                setPicUrl(res.url);
            })
            .catch(e => {
                console.error("Failed to get album art", e);
                setPicUrl('');
            });
    }
  }, [currentTrack]);

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  return (
    <div className={styles.playerBar}>
      <div className={styles.trackInfo}>
        <div className={styles.albumArt} onClick={toggleExpanded} style={{ cursor: 'pointer' }}>
          {picUrl ? (
            <img src={picUrl} alt="Album Art" />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
              <Music size={24} />
            </div>
          )}
        </div>
        <div className={styles.trackDetails}>
          <div className={styles.trackName}>{currentTrack?.name || t('player.noTrack')}</div>
          <div className={styles.artistName}>{currentTrack?.artist?.join(', ') || t('player.selectSong')}</div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={prevTrack}>
            <SkipBack size={20} />
          </button>
          <button className={`${styles.button} ${styles.playButton}`} onClick={togglePlay} disabled={!currentTrack}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
          </button>
          <button className={styles.button} onClick={nextTrack}>
            <SkipForward size={20} />
          </button>
          <button className={styles.button} onClick={() => currentTrack && downloadTrack(currentTrack)} disabled={!currentTrack} title={t('player.download')}>
            <Download size={18} />
          </button>
        </div>
        <div className={styles.progressBarContainer}>
          <span>{formatTime(currentTime)}</span>
          <div className={styles.progressTrack} onClick={handleSeek}>
             <div 
               className={styles.progressFill} 
               style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
             >
                <div className={styles.progressHandle} />
             </div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.volumeContainer}>
        <select 
          value={quality} 
          onChange={(e) => setQuality(Number(e.target.value) as AudioQuality)}
          className={styles.qualitySelect}
          disabled={!currentTrack}
        >
          <option value={128}>128k {t('player.quality.128')}</option>
          <option value={192}>192k {t('player.quality.192')}</option>
          <option value={320}>320k {t('player.quality.320')}</option>
          <option value={740}>SQ {t('player.quality.740')}</option>
          <option value={999}>Lossless {t('player.quality.999')}</option>
        </select>
        <Volume2 size={20} color="var(--text-secondary)" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className={styles.volumeSlider}
          style={{ backgroundSize: `${volume * 100}% 100%` }} 
        />
      </div>
    </div>
  );
}
