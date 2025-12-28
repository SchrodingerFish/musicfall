import FullScreenPlayer from "@/components/FullScreenPlayer/FullScreenPlayer";
import HistoryTracker from "@/components/HistoryTracker";
import PlayerBar from "@/components/PlayerBar/PlayerBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import TopControls from "@/components/TopControls/TopControls";
import { LanguageProvider } from "@/context/LanguageContext";
import { LibraryProvider } from "@/context/LibraryContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { SearchProvider } from "@/context/SearchContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MusicFall",
  description: "Premium Music Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <LibraryProvider>
              <PlayerProvider>
                <SearchProvider>
                  <HistoryTracker />
                  <TopControls />
                  <div className="app-container">
                    <Sidebar />
                    <main className="main-content">
                      {children}
                    </main>
                    <FullScreenPlayer />
                    <PlayerBar />
                  </div>
                </SearchProvider>
              </PlayerProvider>
            </LibraryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
