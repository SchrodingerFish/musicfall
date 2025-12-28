"use client";

import SongList from "@/components/SongList/SongList";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useLibrary();
  const { t } = useLanguage();

  return (
    <div className="page-container" style={{ padding: 'var(--mobile-padding, 2rem)' }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .page-container { padding: 1.5rem !important; }
          .header { flex-direction: column; align-items: flex-start !important; gap: 1rem; }
          .icon-box { width: 64px !important; height: 64px !important; margin-right: 0 !important; }
          .title { font-size: 1.5rem !important; }
        }
      `}</style>
      <header className="header" style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <div className="icon-box" style={{ 
          width: 80, height: 80, 
          background: 'linear-gradient(135deg, #FF6B6B, #EE5253)', 
          borderRadius: 12, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(238, 82, 83, 0.3)',
          marginRight: '1.5rem'
        }}>
          <Heart size={36} color="white" fill="white" />
        </div>
        <div>
           <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t('sidebar.favorites')}</h1>
           <p style={{ opacity: 0.7 }}>{favorites.length} {t('common.songs') || 'songs'}</p>
        </div>
      </header>

      {favorites.length > 0 ? (
        <SongList songs={favorites} />
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
          <Heart size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>{t('search.noResults') || "No favorite songs yet"}</p>
        </div>
      )}
    </div>
  );
}
