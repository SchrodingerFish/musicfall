"use client";

import CreatePlaylistModal from "@/components/Playlist/CreatePlaylistModal";
import PlaylistCover from "@/components/Playlist/PlaylistCover";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { Plus } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

import styles from './playlists.module.css';

export default function PlaylistsPage() {
  const { playlists } = useLibrary();
  const { t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('sidebar.playlists')}</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className={styles.createButton}
        >
          <Plus size={20} />
          {t('playlist.create')}
        </button>
      </header>

      <div className={styles.grid}>
        {playlists.map(playlist => (
          <Link key={playlist.id} href={`/playlists/detail?id=${playlist.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={styles.card}>
               <div className={styles.cover}>
                 <PlaylistCover key={playlist.id} playlist={playlist} />
              </div>
              <h3 className={styles.playlistName}>{playlist.name}</h3>
              <p className={styles.songCount}>{playlist.tracks.length} {t('common.songs')}</p>
            </div>
          </Link>
        ))}
      </div>

      {playlists.length === 0 && (
         <div className={styles.emptyState}>
           <p className={styles.emptyText}>{t('playlist.nolist')}</p>
         </div>
      )}

      {showCreateModal && <CreatePlaylistModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
