"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Music } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
      paddingBottom: '100px'
    }}>
      <div style={{ 
        width: '120px', 
        height: '120px', 
        background: 'var(--glass-bg)', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '2rem',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <Music size={60} style={{ color: 'var(--text-primary)' }} />
      </div>
      
      <h1 style={{ 
        fontSize: '4rem', 
        fontWeight: '800', 
        marginBottom: '1rem',
        background: 'linear-gradient(to right, var(--text-primary), var(--accent-color))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {t('home.title')}
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'var(--text-secondary)', 
        marginBottom: '3rem',
        maxWidth: '500px'
      }}>
        {t('home.description')}
      </p>

      <Link 
        href="/search"
        style={{
          padding: '1rem 2.5rem',
          background: 'var(--accent-color)',
          color: '#fff',
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-hover)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--accent-color)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {t('home.startListening')} <ArrowRight size={20} />
      </Link>
    </div>
  );
}
