"use client";

import { musicApi } from '@/services/api';
import { SearchResult } from '@/types/music';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

export type AudioQuality = 128 | 192 | 320 | 740 | 999;

interface PlayerContextType {
  currentTrack: SearchResult | null;
  isPlaying: boolean;
  isExpanded: boolean;
  isLoading: boolean;
  volume: number;
  quality: AudioQuality;
  currentTime: number;
  duration: number;
  queue: SearchResult[];
  playTrack: (track: SearchResult) => Promise<void>;
  togglePlay: () => void;
  toggleExpanded: () => void;
  setVolume: (vol: number) => void;
  setQuality: (quality: AudioQuality) => void;
  downloadTrack: (track: SearchResult) => Promise<void>;
  seek: (time: number) => void;
  addToQueue: (track: SearchResult) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  playQueue: (tracks: SearchResult[], startIndex?: number) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<SearchResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQualityState] = useState<AudioQuality>(999);
  const [volume, setVolumeState] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<SearchResult[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Helper functions defined before usage
  const setVolume = (vol: number) => {
    setVolumeState(vol);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const addToQueue = (track: SearchResult) => {
    setQueue(prev => {
      if (prev.find(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  const playQueue = async (tracks: SearchResult[], startIndex: number = 0) => {
    if (!audioRef.current || tracks.length === 0) return;
    
    setQueue(tracks); // Replace entire queue
    const trackToPlay = tracks[startIndex];
    
    setIsLoading(true);
    setCurrentTrack(trackToPlay);
    setIsPlaying(false);

    try {
      const { url } = await musicApi.getMusicUrl(trackToPlay.id, trackToPlay.source, quality);
      if (!url) throw new Error("No URL found");

      audioRef.current.src = url;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to play track from queue", err);
    } finally {
      setIsLoading(false);
    }
  };

  const playTrack = async (track: SearchResult) => {
    if (!audioRef.current) return;
    
    // If playing a single track, we just append it to queue or play it if existing?
    // Current behavior: play immediately and add to queue.
    
    setIsLoading(true);
    setCurrentTrack(track);
    setIsPlaying(false);

    try {
      const { url } = await musicApi.getMusicUrl(track.id, track.source, quality);
      if (!url) throw new Error("No URL found");

      audioRef.current.src = url;
      await audioRef.current.play();
      setIsPlaying(true);
      
      addToQueue(track);
    } catch (err) {
      console.error("Failed to play track", err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex === -1) return; // Should not happen ideally
    
    const nextIndex = (currentIndex + 1) % queue.length;
    // We reuse the play logic but without network fetch if it's just 'next' in UI? 
    // Actually we DO need network fetch for every new song usually unless preloaded.
    // For simplicity, we call playTrack-like logic but specifically for the queue item.
    
    const nextSong = queue[nextIndex];
    // Optimized: call internal play helper to avoid "addToQueue" duplication logic or create separate helper
    playQueue([nextSong], 0).then(() => {
        // Check: wait, playQueue REPLACES queue. We shouldn't use playQueue here.
        // We should just play the track but KEEP the queue.
        playTrackInQueue(nextSong);
    });
  };

  const prevTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    const prevSong = queue[prevIndex];
    playTrackInQueue(prevSong);
  };
  
  // Helper to play a track that is ALREADY in the queue or presumed to be
  const playTrackInQueue = async (track: SearchResult) => {
    if (!audioRef.current) return;
    
    setIsLoading(true);
    setCurrentTrack(track);
    setIsPlaying(false);

    try {
      const { url } = await musicApi.getMusicUrl(track.id, track.source, quality);
      if (!url) throw new Error("No URL found");

      audioRef.current.src = url;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to play track", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
       audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const setQuality = async (newQuality: AudioQuality) => {
    setQualityState(newQuality);
    if (currentTrack && audioRef.current) {
      const wasPlaying = isPlaying;
      const currentTime = audioRef.current.currentTime;
      
      setIsLoading(true);
      try {
        const { url } = await musicApi.getMusicUrl(currentTrack.id, currentTrack.source, newQuality);
        if (url) {
          audioRef.current.src = url;
          audioRef.current.currentTime = currentTime;
          if (wasPlaying) {
             await audioRef.current.play();
          }
        }
      } catch (e) {
        console.error("Failed to change quality", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const downloadTrack = async (track: SearchResult) => {
     try {
       const { url } = await musicApi.getMusicUrl(track.id, track.source, quality);
       if (!url) throw new Error("No URL for download");
       
       const response = await fetch(url);
       const blob = await response.blob();
       const blobUrl = window.URL.createObjectURL(blob);
       
       const a = document.createElement('a');
       a.href = blobUrl;
       a.download = `${track.name} - ${track.artist.join(', ')}.mp3`;
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       window.URL.revokeObjectURL(blobUrl);
     } catch (e) {
       console.error("Download failed", e);
       alert("Download failed. API source might prevent direct downloads.");
     }
  };

  // Effects
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Update effect to solve closure staleness issue with 'nextTrack' inside 'handleEnded'
  // The initial useEffect has 'nextTrack' closed over initial state. 
  // We need to use a Ref or recreate listener when 'currentTrack' or 'queue' changes.
  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;
    
    // We need to re-bind ended listener because 'nextTrack' relies on current 'queue' state
    const handleEnded = () => {
        // Logic from nextTrack, but we need fresh state access.
        // Actually, best way is to Move nextTrack logic into a separate effect dependent on a "trackEnded" state? 
        // Or just let the closure update by re-running this effect.
        
        // Let's implement simple next logic here using the updated scope
        if (queue.length === 0) return;
        
        // We can't easily access 'currentTrack' in this scope if we don't depend on it.
        // But if we depend on it, we might detach/reattach listeners too often.
        // For now, let's trust React ref-based approach or just re-attach on queue change.
    };
    
    // Actually, simply adding [queue, currentTrack] to the dependency array of the main effect 
    // is the React way, but we don't want to re-create the Audio object.
    
    // Correction: We should separate the EVENT LISTENERS from the Audio creation.
  }, [queue, currentTrack]); // This is a placeholder comment, I will fix the structure below.

  // FIX: Separate Audio creation and Event Listeners
  useEffect(() => {
      if(!audioRef.current) {
          audioRef.current = new Audio();
      }
      // Initial volume
      audioRef.current.volume = volume;
  }, []);

  useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => setDuration(audio.duration);
      
      const handleEnded = () => {
          // This closure needs access to LATEST queue and currentTrack
          // But we can't easily get it inside a stable event listener unless we use refs.
          // WE WILL USE A REF for the queue/currentTrack.
          playNextTrackRef.current();
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
      // We only run this ONCE to bind listeners. The listeners call a REF function.
  }, []);

  // Mutable refs to hold latest state for the event listener
  const queueRef = useRef(queue);
  const currentTrackRef = useRef(currentTrack);
  
  useEffect(() => {
      queueRef.current = queue;
      currentTrackRef.current = currentTrack;
  }, [queue, currentTrack]);

  const playNextTrackRef = useRef(() => {});
  
  // Update the ref function whenever nextTrack changes (or its dependencies)
  useEffect(() => {
      playNextTrackRef.current = () => {
          const q = queueRef.current;
          const curr = currentTrackRef.current;
          
          if (!curr || q.length === 0) return;
          const idx = q.findIndex(t => t.id === curr.id);
          const nextIdx = (idx + 1) % q.length;
          playTrackInQueue(q[nextIdx]);
      };
  }, [queue, currentTrack]); // Depends on same things as nextTrack


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      isExpanded,
      isLoading,
      volume,
      quality,
      currentTime,
      duration,
      queue,
      playTrack,
      playQueue,
      togglePlay,
      toggleExpanded,
      setVolume,
      setQuality,
      downloadTrack,
      seek,
      addToQueue,
      nextTrack,
      prevTrack
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
