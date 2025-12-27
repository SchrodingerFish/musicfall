"use client";

import { useLibrary } from "@/context/LibraryContext";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect, useRef } from "react";

export default function HistoryTracker() {
  const { currentTrack } = usePlayer();
  const { addToHistory } = useLibrary();
  const lastTrackIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (currentTrack && currentTrack.id !== lastTrackIdRef.current) {
      addToHistory(currentTrack);
      lastTrackIdRef.current = currentTrack.id;
    }
  }, [currentTrack, addToHistory]);

  return null;
}
