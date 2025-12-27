"use client";

import SongList from "@/components/SongList/SongList";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { History, Trash2 } from "lucide-react";

export default function HistoryPage() {
  const { history, clearHistory } = useLibrary();
  const { t } = useLanguage();

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: 80, height: 80, 
            background: 'linear-gradient(135deg, #54a0ff, #2e86de)', 
            borderRadius: 12, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(46, 134, 222, 0.3)',
            marginRight: '1.5rem'
          }}>
            <History size={36} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t('sidebar.history')}</h1>
            <p style={{ opacity: 0.7 }}>{t('common.recentSongs') || 'Recently played'}</p>
          </div>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            style={{ 
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.8rem 1.5rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#ff6b6b',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Trash2 size={16} />
            {t('common.clear') || 'Clear'}
          </button>
        )}
      </header>

      {history.length > 0 ? (
        <SongList songs={history} />
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
          <History size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>{t('search.noResults') || "No history yet"}</p>
        </div>
      )}
    </div>
  );
}
