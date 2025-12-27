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
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '2rem',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 40px rgba(0,0,0,0.2)'
      }}>
        <Music size={60} color="#fff" />
      </div>
      
      <h1 style={{ 
        fontSize: '4rem', 
        fontWeight: '800', 
        marginBottom: '1rem',
        background: 'linear-gradient(to right, #fff, #ff0055)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {t('home.title')}
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'rgba(255,255,255,0.6)', 
        marginBottom: '3rem',
        maxWidth: '500px'
      }}>
        {t('home.description')}
      </p>

      <Link 
        href="/search"
        style={{
          padding: '1rem 2.5rem',
          background: '#fff',
          color: '#000',
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'transform 0.2s',
          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
        }}
      >
        {t('home.startListening')} <ArrowRight size={20} />
      </Link>
    </div>
  );
}
