"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Disc, Heart, History, Home, ListMusic, Monitor, Moon, Search, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: t('sidebar.home'), href: '/', icon: Home },
    { name: t('sidebar.search'), href: '/search', icon: Search },
    { name: t('sidebar.playlists'), href: '/playlists', icon: ListMusic },
    { name: t('sidebar.favorites'), href: '/favorites', icon: Heart },
    { name: t('sidebar.history'), href: '/history', icon: History },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Disc size={28} color="#fff" style={{ marginRight: 8 }} />
        MusicFall
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer} style={{ marginTop: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Language Switcher */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
           <button onClick={() => setLanguage('zh')} style={{ opacity: language === 'zh' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-primary)' }}>中</button>
           <button onClick={() => setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-primary)' }}>En</button>
           <button onClick={() => setLanguage('ko')} style={{ opacity: language === 'ko' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-primary)' }}>한</button>
           <button onClick={() => setLanguage('ja')} style={{ opacity: language === 'ja' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-primary)' }}>日</button>
        </div>

        {/* Theme Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--glass-bg)', padding: '4px', borderRadius: '8px' }}>
            <button 
              onClick={() => setTheme('light')} 
              title={t('theme.light')}
              style={{ flex: 1, padding: '4px', border: 'none', background: theme === 'light' ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
            >
              <Sun size={16} color="var(--text-primary)" />
            </button>
            <button 
              onClick={() => setTheme('dark')} 
              title={t('theme.dark')}
              style={{ flex: 1, padding: '4px', border: 'none', background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
            >
              <Moon size={16} color="var(--text-primary)" />
            </button>
            <button 
              onClick={() => setTheme('system')} 
              title={t('theme.system')}
              style={{ flex: 1, padding: '4px', border: 'none', background: theme === 'system' ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
            >
              <Monitor size={16} color="var(--text-primary)" />
            </button>
        </div>
      </div>
    </aside>
  );
}
