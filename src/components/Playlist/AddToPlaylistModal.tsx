"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useLibrary } from '@/context/LibraryContext';
import { SearchResult } from '@/types/music';
import { Plus, X } from 'lucide-react';

interface AddToPlaylistModalProps {
  onClose: () => void;
  track: SearchResult;
}

export default function AddToPlaylistModal({ onClose, track }: AddToPlaylistModalProps) {
  const { playlists, addToPlaylist, createPlaylist } = useLibrary();
  const { t } = useLanguage();

  const handleCreate = () => {
    const name = prompt(t('playlist.name'));
    if (name) {
      createPlaylist(name);
    }
  };

  const handleAdd = (playlistId: string) => {
    addToPlaylist(playlistId, track);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#1e1e1e', padding: '2rem', borderRadius: '12px',
        width: '400px', maxWidth: '90vw',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Add to Playlist</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
          {playlists.map(p => {
             const alreadyIn = p.tracks.some(t => t.id === track.id);
             return (
               <button 
                key={p.id}
                onClick={() => handleAdd(p.id)}
                disabled={alreadyIn}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '1rem', marginBottom: '0.5rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none', color: 'white',
                  cursor: alreadyIn ? 'default' : 'pointer',
                  opacity: alreadyIn ? 0.5 : 1,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
               >
                 <span>{p.name} <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>({p.tracks.length})</span></span>
                 {alreadyIn && <span style={{ fontSize: '0.8rem' }}>Added</span>}
               </button>
             );
          })}
          
          {playlists.length === 0 && (
             <p style={{ opacity: 0.5, textAlign: 'center', padding: '1rem' }}>No playlists yet</p>
          )}
        </div>

        <button 
          onClick={handleCreate}
          style={{
            width: '100%', padding: '0.8rem', borderRadius: '8px',
            background: 'transparent',
            border: '1px dashed rgba(255,255,255,0.3)',
            color: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
          }}
        >
          <Plus size={18} />
          {t('playlist.create')}
        </button>
      </div>
    </div>
  );
}
