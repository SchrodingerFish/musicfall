"use client";

import { MusicSource, SearchResult } from '@/types/music';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface SearchContextType {
  query: string;
  source: MusicSource;
  results: SearchResult[];
  searched: boolean;
  loading: boolean;
  setQuery: (query: string) => void;
  setSource: (source: MusicSource) => void;
  setResults: (results: SearchResult[]) => void;
  setSearched: (searched: boolean) => void;
  setLoading: (loading: boolean) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<MusicSource>('netease');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载
  useEffect(() => {
    const loadData = () => {
      try {
        const savedState = localStorage.getItem('musicfall_search_state');
        if (savedState) {
          const { query, source, results, searched } = JSON.parse(savedState);
          setQuery(query || '');
          setSource(source || 'netease');
          setResults(results || []);
          setSearched(searched || false);
        }
      } catch (e) {
        console.error('Failed to load search state', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    if (!isLoaded) return;
    const state = { query, source, results, searched };
    localStorage.setItem('musicfall_search_state', JSON.stringify(state));
  }, [query, source, results, searched, isLoaded]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <SearchContext.Provider value={{
      query,
      source,
      results,
      searched,
      loading,
      setQuery,
      setSource,
      setResults,
      setSearched,
      setLoading,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
