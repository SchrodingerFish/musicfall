"use client";

import { useLanguage } from '@/context/LanguageContext';
import { usePlayer } from '@/context/PlayerContext';
import { useTheme } from '@/context/ThemeContext';
import { Monitor, Moon, Sun } from 'lucide-react';
import styles from './TopControls.module.css';

export default function TopControls() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { isExpanded } = usePlayer();

  if (isExpanded) return null;

  return (
    <div className={styles.container}>
      {/* Language Switcher */}
      <div className={styles.section}>
        <div className={styles.selectWrapper}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as any)}
            className={styles.select}
          >
            <option value="zh" style={{ background: 'var(--background-accent)', color: 'var(--text-primary)' }}>简体中文</option>
            <option value="en" style={{ background: 'var(--background-accent)', color: 'var(--text-primary)' }}>English</option>
            <option value="ko" style={{ background: 'var(--background-accent)', color: 'var(--text-primary)' }}>한국어</option>
            <option value="ja" style={{ background: 'var(--background-accent)', color: 'var(--text-primary)' }}>日本語</option>
          </select>
          <div className={styles.arrow}>▼</div>
        </div>
      </div>

      {/* Theme Switcher */}
      <div className={styles.themeGroup}>
        <button 
          onClick={() => setTheme('light')} 
          title={t('theme.light')}
          className={`${styles.themeBtn} ${theme === 'light' ? styles.activeTheme : ''}`}
        >
          <Sun size={14} />
        </button>
        <button 
          onClick={() => setTheme('dark')} 
          title={t('theme.dark')}
          className={`${styles.themeBtn} ${theme === 'dark' ? styles.activeTheme : ''}`}
        >
          <Moon size={14} />
        </button>
        <button 
          onClick={() => setTheme('system')} 
          title={t('theme.system')}
          className={`${styles.themeBtn} ${theme === 'system' ? styles.activeTheme : ''}`}
        >
          <Monitor size={14} />
        </button>
      </div>
    </div>
  );
}
