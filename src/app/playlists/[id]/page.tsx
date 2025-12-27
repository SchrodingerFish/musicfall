"use client";

import SongList from "@/components/SongList/SongList";
import { useLanguage } from "@/context/LanguageContext";
import { useLibrary } from "@/context/LibraryContext";
import { usePlayer } from "@/context/PlayerContext";
import { musicApi } from "@/services/api";
import JSZip from 'jszip';
import { Download, Play, Trash2 } from "lucide-react";
import { useParams, useRouter } from 'next/navigation';
import { useState } from "react";

export default function PlaylistDetailPage() {
  const { id } = useParams() as { id: string };
  const { getPlaylist, deletePlaylist } = useLibrary();
  const { playQueue, quality } = usePlayer();
  const { t } = useLanguage();
  const router = useRouter();

  const playlist = getPlaylist(id);
  const [downloading, setDownloading] = useState(false);

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
    
    // We limit to 5 concurrent downloads to avoid browser limits/rate limits
    // Simple batching
    
    let count = 0;
    const folder = zip.folder(playlist.name) || zip;
    
    try {
        const promises = playlist.tracks.map(async (track) => {
             // Basic fetch
             try {
                const { url } = await musicApi.getMusicUrl(track.id, track.source, quality);
                if(url) {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    folder.file(`${track.name} - ${track.artist.join(',')}.mp3`, blob);
                    count++;
                }
             } catch(e) {
                 console.error(`Failed to download ${track.name}`, e);
             }
        });
        
        await Promise.all(promises);
        
        if (count > 0) {
            const content = await zip.generateAsync({ type: "blob" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(content);
            link.download = `${playlist.name}.zip`;
            link.click();
        } else {
            alert("None of the tracks could be downloaded.");
        }
    } catch(err) {
        console.error("Batch download failed", err);
        alert("Batch download failed.");
    } finally {
        setDownloading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: 200, height: 200, 
          background: 'linear-gradient(135deg, #10ac84, #1dd1a1)', 
          borderRadius: 16, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
           <span style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.2)' }}>
              {playlist.name.charAt(0).toUpperCase()}
           </span>
        </div>
        
        <div style={{ flex: 1 }}>
           <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.7 }}>{t('sidebar.playlists')}</h4>
           <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0.5rem 0' }}>{playlist.name}</h1>
           <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{playlist.description || "No description"}</p>
           <p style={{ opacity: 0.7 }}>{playlist.tracks.length} {t('common.songs')}</p>
           
           <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                onClick={handlePlayAll}
                disabled={playlist.tracks.length === 0}
                style={{ 
                    padding: '0.8rem 2rem', borderRadius: '999px',
                    background: '#4ec9b0', border: 'none', color: 'black',
                    fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    opacity: playlist.tracks.length === 0 ? 0.5 : 1
                }}
              >
                  <Play fill="black" size={20} />
                  {t('playlist.playAll')}
              </button>

              <button 
                onClick={handleDownloadAll}
                disabled={playlist.tracks.length === 0 || downloading}
                style={{ 
                    padding: '0.8rem 1.5rem', borderRadius: '999px',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                  <Download size={20} />
                  {downloading ? 'Downloading...' : t('playlist.downloadAll')}
              </button>

              <button 
                onClick={handleDelete}
                style={{ 
                    padding: '0.8rem', borderRadius: '999px',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ff6b6b', cursor: 'pointer',
                    marginLeft: 'auto'
                }}
                title="Delete Playlist"
              >
                  <Trash2 size={20} />
              </button>
           </div>
        </div>
      </header>

      <SongList songs={playlist.tracks} />
    </div>
  );
}
