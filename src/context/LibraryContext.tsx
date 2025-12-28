"use client";

import { Playlist, SearchResult } from '@/types/music';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LibraryContextType {
  history: SearchResult[];
  favorites: SearchResult[];
  playlists: Playlist[];
  addToHistory: (track: SearchResult) => void;
  clearHistory: () => void;
  toggleFavorite: (track: SearchResult) => void;
  isFavorite: (trackId: string) => boolean;
  createPlaylist: (name: string, description?: string) => void;
  deletePlaylist: (id: string) => void;
  addToPlaylist: (playlistId: string, track: SearchResult) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  getPlaylist: (id: string) => Playlist | undefined;
  isLoaded: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<SearchResult[]>([]);
  const [favorites, setFavorites] = useState<SearchResult[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedHistory = localStorage.getItem('musicfall_history');
        const storedFavorites = localStorage.getItem('musicfall_favorites');
        const storedPlaylists = localStorage.getItem('musicfall_playlists');

        if (storedHistory) setHistory(JSON.parse(storedHistory));
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
        if (storedPlaylists) setPlaylists(JSON.parse(storedPlaylists));
      } catch (e) {
        console.error("Failed to load library data", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('musicfall_history', JSON.stringify(history));
  }, [history, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('musicfall_favorites', JSON.stringify(favorites));
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('musicfall_playlists', JSON.stringify(playlists));
  }, [playlists, isLoaded]);

  const addToHistory = (track: SearchResult) => {
    setHistory(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 100); // Keep last 100
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleFavorite = (track: SearchResult) => {
    setFavorites(prev => {
      const exists = prev.find(t => t.id === track.id);
      if (exists) {
        return prev.filter(t => t.id !== track.id);
      } else {
        return [track, ...prev];
      }
    });
  };

  const isFavorite = (trackId: string) => {
    return favorites.some(t => t.id === trackId);
  };

  const createPlaylist = (name: string, description?: string) => {
    const newPlaylist: Playlist = {
      id: crypto.randomUUID(),
      name,
      description,
      tracks: [],
      createdAt: Date.now(),
    };
    setPlaylists(prev => [newPlaylist, ...prev]);
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
  };

  const addToPlaylist = (playlistId: string, track: SearchResult) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        // Avoid duplicates
        if (p.tracks.some(t => t.id === track.id)) return p;
        return { ...p, tracks: [...p.tracks, track] };
      }
      return p;
    }));
  };

  const removeFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, tracks: p.tracks.filter(t => t.id !== trackId) };
      }
      return p;
    }));
  };

  const getPlaylist = (id: string) => {
    return playlists.find(p => p.id === id);
  };

  return (
    <LibraryContext.Provider value={{
      history,
      favorites,
      playlists,
      addToHistory,
      clearHistory,
      toggleFavorite,
      isFavorite,
      createPlaylist,
      deletePlaylist,
      addToPlaylist,
      removeFromPlaylist,
      getPlaylist,
      isLoaded
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
