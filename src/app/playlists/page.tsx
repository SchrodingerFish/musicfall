"use client";

import CreatePlaylistModal from "@/components/Playlist/CreatePlaylistModal";
import PlaylistCover from "@/components/Playlist/PlaylistCover";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { Plus } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

export default function PlaylistsPage() {
  const { playlists } = useLibrary();
  const { t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t('sidebar.playlists')}</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ 
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0.8rem 1.5rem',
            borderRadius: '999px',
            background: 'var(--accent-color)',
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-color)'}
        >
          <Plus size={20} />
          {t('playlist.create')}
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
        {playlists.map(playlist => (
          <Link key={playlist.id} href={`/playlists/detail?id=${playlist.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              background: 'var(--glass-bg)', 
              borderRadius: '12px', 
              padding: '1.5rem',
              border: '1px solid var(--glass-border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'all 0.2s',
              cursor: 'pointer',
              height: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-border)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
            >
               <div style={{ 
                width: '100%', aspectRatio: '1/1', 
                marginBottom: '1rem',
                borderRadius: '8px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                 <PlaylistCover key={playlist.id} playlist={playlist} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.2rem', textAlign: 'center', color: 'var(--text-primary)' }}>{playlist.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{playlist.tracks.length} {t('common.songs')}</p>
            </div>
          </Link>
        ))}
      </div>

      {playlists.length === 0 && (
         <div style={{ textAlign: 'center', padding: '4rem' }}>
           <p style={{ color: 'var(--text-muted)' }}>{t('playlist.nolist')}</p>
         </div>
      )}

      {showCreateModal && <CreatePlaylistModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
