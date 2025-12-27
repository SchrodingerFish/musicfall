"use client";

import { usePlayer } from '@/context/PlayerContext';
import { musicApi } from '@/services/api';
import { ChevronDown, Music } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './FullScreenPlayer.module.css';

interface LyricLine {
  time: number;
  text: string;
}

export default function FullScreenPlayer() {
  const { isExpanded, toggleExpanded, currentTrack, currentTime } = usePlayer();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [picUrl, setPicUrl] = useState('');
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentTrack) {
      if (currentTrack.pic_id) {
         musicApi.getAlbumArt(currentTrack.pic_id, currentTrack.source, 500)
                 .then(res => setPicUrl(res.url))
                 .catch(() => setPicUrl(''));
      }
      
      musicApi.getLyric(currentTrack.lyric_id, currentTrack.source).then(res => {
        if (res.lyric) {
           const parsed = parseLrc(res.lyric);
           setLyrics(parsed);
        } else {
           setLyrics([]);
        }
      }).catch(err => {
        console.error("Lyrics fetch failed", err);
        setLyrics([]);
      });
    }
  }, [currentTrack]);

  // Auto scroll
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentTime]);

  const parseLrc = (lrc: string): LyricLine[] => {
    const lines = lrc.split('\n');
    const result: LyricLine[] = [];
    const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    
    for (const line of lines) {
      const match = timeReg.exec(line);
      if (match) {
        const min = parseInt(match[1]);
        const sec = parseInt(match[2]);
        const ms = parseInt(match[3].padEnd(3, '0'));
        const time = min * 60 + sec + ms / 1000;
        const text = line.replace(timeReg, '').trim();
        if (text) {
          result.push({ time, text });
        }
      }
    }
    return result;
  };

  const getActiveIndex = () => {
     // Find the last line that has time <= currentTime
     for (let i = lyrics.length - 1; i >= 0; i--) {
       if (currentTime >= lyrics[i].time) {
         return i;
       }
     }
     return -1;
  };

  const activeIndex = getActiveIndex();

  return (
    <div className={`${styles.container} ${isExpanded ? styles.visible : ''}`}>
      <button className={styles.closeButton} onClick={toggleExpanded}>
        <ChevronDown size={32} />
      </button>

      {/* Background with blur image */}
      <div style={{
          position: 'absolute',
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundImage: `url(${picUrl})`,
          backgroundSize: 'cover',
          filter: 'blur(80px) brightness(0.4)',
          zIndex: -1
      }} />

      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.albumArt}>
             {picUrl ? <img src={picUrl} alt="Album Art" /> : <div style={{width:'100%',height:'100%',background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><Music size={64} /></div>}
          </div>
          <div className={styles.trackInfo}>
             <div className={styles.title}>{currentTrack?.name}</div>
             <div className={styles.artist}>{currentTrack?.artist?.join(', ')}</div>
          </div>
        </div>

        <div className={styles.rightSection}>
           <div className={styles.lyricsContainer}>
              {lyrics.length > 0 ? lyrics.map((line, idx) => (
                <div 
                  key={idx} 
                  ref={idx === activeIndex ? activeLineRef : null}
                  className={`${styles.lyricLine} ${idx === activeIndex ? styles.activeLine : ''}`}
                >
                  {line.text}
                </div>
              )) : (
                <div className={styles.lyricLine}>No Lyrics Available</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
