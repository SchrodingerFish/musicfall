"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Music } from "lucide-react";
import Link from "next/link";
import styles from './home.module.css';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Music size={60} style={{ color: 'var(--text-primary)' }} />
      </div>
      
      <h1 className={styles.title}>
        {t('home.title')}
      </h1>
      
      <p className={styles.description}>
        {t('home.description')}
      </p>

      <Link 
        href="/search"
        className={styles.startButton}
      >
        {t('home.startListening')} <ArrowRight size={20} />
      </Link>
    </div>
  );
}
