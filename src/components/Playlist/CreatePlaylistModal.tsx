"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useLibrary } from '@/context/LibraryContext';
import { X } from 'lucide-react';
import { useState } from 'react';

interface CreatePlaylistModalProps {
  onClose: () => void;
}

export default function CreatePlaylistModal({ onClose }: CreatePlaylistModalProps) {
  const { createPlaylist } = useLibrary();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createPlaylist(name, description);
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{t('playlist.create')}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('playlist.name')}</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              style={{
                width: '100%', padding: '0.8rem', borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: 'white'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('playlist.description')}</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              style={{
                width: '100%', padding: '0.8rem', borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: 'white',
                minHeight: '80px'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                padding: '0.8rem 1.5rem', borderRadius: '8px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white', cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!name.trim()}
              style={{
                padding: '0.8rem 1.5rem', borderRadius: '8px',
                background: '#4ec9b0',
                border: 'none',
                color: 'black', fontWeight: 'bold', cursor: 'pointer',
                opacity: name.trim() ? 1 : 0.5
              }}
            >
              {t('playlist.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
