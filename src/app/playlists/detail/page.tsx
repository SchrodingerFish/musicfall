"use client";

import PlaylistCover from "@/components/Playlist/PlaylistCover";
import SongList from "@/components/SongList/SongList";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { usePlayer } from "@/context/PlayerContext";
import { musicApi } from "@/services/api";
import JSZip from 'jszip';
import { Download, Play, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from "react";
import styles from './detail.module.css';

function PlaylistDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getPlaylist, deletePlaylist } = useLibrary();
  const { playQueue, quality } = usePlayer();
  const { t } = useLanguage();
  const router = useRouter();

  const [downloading, setDownloading] = useState(false);

  if (!id) {
    return <div style={{ padding: '2rem' }}>Invalid playlist ID</div>;
  }

  const playlist = getPlaylist(id);

  if (!playlist) {
    return <div style={{ padding: '2rem' }}>Playlist not found</div>;
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this playlist?")) {
      deletePlaylist(id);
      router.push('/playlists');
    }
  };

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      playQueue(playlist.tracks);
    }
  };

  const handleDownloadAll = async () => {
    if (downloading) return;
    setDownloading(true);
    const zip = new JSZip();
    
    let count = 0;
    const folder = zip.folder(playlist.name) || zip;
    const BATCH_SIZE = 3; // Limit concurrent downloads
    
    try {
        // Splitting into batches
        for (let i = 0; i < playlist.tracks.length; i += BATCH_SIZE) {
            const batch = playlist.tracks.slice(i, i + BATCH_SIZE);
            
            await Promise.all(batch.map(async (track) => {
                 try {
                    const { url } = await musicApi.getMusicUrl(track.id, track.source, quality);
                    if(url) {
                        const response = await fetch(url);
                        if (!response.ok) throw new Error('Network response was not ok');
                        const blob = await response.blob();
                        // Sanitize filename
                        const safeName = track.name.replace(/[\\/:*?"<>|]/g, '_');
                        const safeArtist = track.artist.join(',').replace(/[\\/:*?"<>|]/g, '_');
                        folder.file(`${safeName} - ${safeArtist}.mp3`, blob);
                        count++;
                    }
                 } catch(e) {
                     console.error(`Failed to download ${track.name}`, e);
                 }
            }));
            
            // Optional: small delay between batches to be nice to the API
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        if (count > 0) {
            const content = await zip.generateAsync({ type: "blob" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(content);
            link.download = `${playlist.name}.zip`;
            link.click();
        } else {
            alert(t('playlist.nolist') || "No tracks downloaded"); // Fallback if translation missing context
        }
    } catch(err) {
        console.error("Batch download failed", err);
        alert("Batch download failed.");
    } finally {
        setDownloading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.coverWrapper}>
           <PlaylistCover playlist={playlist} />
        </div>
        
        <div className={styles.content}>
           <h4 className={styles.label}>{t('sidebar.playlists')}</h4>
           <h1 className={styles.title}>{playlist.name}</h1>
           <p className={styles.description}>{playlist.description || t('playlist.description')}</p>
           <p className={styles.stats}>{playlist.tracks.length} {t('common.songs')}</p>
           
           <div className={styles.actions}>
              <button 
                onClick={handlePlayAll}
                disabled={playlist.tracks.length === 0}
                className={styles.playButton}
              >
                  <Play fill="white" size={20} />
                  {t('playlist.playAll')}
              </button>

              <button 
                onClick={handleDownloadAll}
                disabled={playlist.tracks.length === 0 || downloading}
                className={styles.actionButton}
              >
                  <Download size={20} />
                  {downloading ? t('playlist.downloading') : t('playlist.downloadAll')}
              </button>

              <button 
                onClick={handleDelete}
                className={styles.deleteButton}
                title="Delete Playlist"
              >
                  <Trash2 size={20} />
              </button>
           </div>
        </div>
      </header>

      <SongList songs={playlist.tracks} playlistId={id} />
    </div>
  );
}

export default function PlaylistDetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
      <PlaylistDetailContent />
    </Suspense>
  );
}
