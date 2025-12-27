"use client";

import CreatePlaylistModal from "@/components/Playlist/CreatePlaylistModal";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { Disc, Plus } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

export default function PlaylistsPage() {
  const { playlists } = useLibrary();
  const { t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{t('sidebar.playlists')}</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ 
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0.8rem 1.5rem',
            borderRadius: '999px',
            background: '#4ec9b0',
            border: 'none',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          <Plus size={20} />
          {t('playlist.create')}
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
        {playlists.map(playlist => (
          <Link key={playlist.id} href={`/playlists/${playlist.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '12px', 
              padding: '1.5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'background 0.2s',
              cursor: 'pointer',
              height: '100%'
            }}>
              <div style={{ 
                width: '100%', aspectRatio: '1/1', 
                marginBottom: '1rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                 {playlist.tracks.length > 0 && playlist.tracks[0].pic_id ? (
                    <img 
                      src={`https://music.163.com/song/media/outer/url?id=${playlist.tracks[0].pic_id}.jpg`} // Simplified, real implementation uses cached URL or API
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      alt={playlist.name}
                      onError={e => (e.currentTarget.style.display = 'none')}
                    />
                 ) : (
                    <Disc size={48} style={{ opacity: 0.3 }} />
                 )}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.2rem', textAlign: 'center' }}>{playlist.name}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{playlist.tracks.length} {t('common.songs')}</p>
            </div>
          </Link>
        ))}
      </div>

      {playlists.length === 0 && (
         <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
           <p>No playlists created yet</p>
         </div>
      )}

      {showCreateModal && <CreatePlaylistModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
