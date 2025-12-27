"use client";

import SongList from '@/components/SongList/SongList';
import { useLanguage } from '@/context/LanguageContext';
import { musicApi } from '@/services/api';
import { MusicSource, SearchResult } from '@/types/music';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import styles from './search.module.css';

const SOURCES: MusicSource[] = [
  'netease', 'tencent', 'kugou', 'kuwo', 'bilibili', 'migu', 'spotify', 'ytmusic'
] as any;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<MusicSource>('netease');
  const { t } = useLanguage();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await musicApi.search(query, source, 1, 30);
      setResults(res || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('sidebar.search')}</h1>
      
      <form onSubmit={handleSearch} className={styles.searchBarContainer}>
        <div className={styles.inputWrapper}>
          <SearchIcon size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
        </div>
        
        <select 
          value={source} 
          onChange={(e) => setSource(e.target.value as MusicSource)}
          className={styles.select}
        >
          {SOURCES.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <Loader2 className={styles.spin} /> : t('search.button')}
        </button>
      </form>

      <div className={styles.resultsArea}>
        {loading ? (
          <div className={styles.loadingState}>
            <Loader2 className={styles.spin} size={32} />
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <SongList songs={results} />
            ) : (
              searched && <div className={styles.emptyState}>{t('search.noResults')}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
