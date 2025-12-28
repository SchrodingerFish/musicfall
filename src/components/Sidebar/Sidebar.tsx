"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Disc, Heart, History, Home, ListMusic, Search } from 'lucide-react';
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

    </aside>
  );
}
