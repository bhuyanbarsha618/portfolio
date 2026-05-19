import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface BottomDockMenuProps {
  style?: React.CSSProperties;
}

export default function BottomDockMenu({ style = {} }: BottomDockMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll position to fade the menu container slightly when scrolled deep
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (targetId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation route mount then scroll
      setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '36px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: scrolled ? 0.95 : 1,
        transition: 'opacity 0.3s ease',
        ...style
      }}
    >
      {/* Floating Menu Buttons Wrapper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '10px 16px',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(26, 26, 26, 0.08)',
          borderRadius: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          marginBottom: '14px'
        }}
      >
        {/* HOME Button */}
        <button
          onClick={() => handleNav('home')}
          className="clickable"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(235, 230, 250, 0.85)',
            border: '1px solid rgba(26, 26, 26, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '15px',
            color: '#4e3b7c',
            transition: 'transform 0.2s ease',
            position: 'relative'
          }}
          title="Home"
        >
          ⌂
        </button>

        {/* WORK / PROJECTS Button (Flower symbol) */}
        <button
          onClick={() => handleNav('projects')}
          className="clickable"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(235, 230, 250, 0.85)',
            border: '1px solid rgba(26, 26, 26, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '15px',
            color: '#4e3b7c',
            transition: 'transform 0.2s ease'
          }}
          title="Work"
        >
          ✿
        </button>

        {/* ABOUT / INFO Button (i symbol) */}
        <button
          onClick={() => handleNav('about')}
          className="clickable"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(235, 230, 250, 0.85)',
            border: '1px solid rgba(26, 26, 26, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '17px',
            color: '#4e3b7c',
            transition: 'transform 0.2s ease'
          }}
          title="About"
        >
          i
        </button>

        {/* CONTACT Button (✉ symbol) */}
        <button
          onClick={() => handleNav('contact')}
          className="clickable"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(235, 230, 250, 0.85)',
            border: '1px solid rgba(26, 26, 26, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '14px',
            color: '#4e3b7c',
            transition: 'transform 0.2s ease'
          }}
          title="Contact"
        >
          ✉
        </button>
      </div>

      {/* Main Toggle Action Button (Plus/Cross) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="clickable"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: isOpen ? '#4e3b7c' : 'rgba(235, 230, 250, 0.95)',
          border: '1px solid rgba(26, 26, 26, 0.06)',
          boxShadow: '0 8px 24px rgba(78, 59, 124, 0.15)',
          color: isOpen ? '#ffffff' : '#4e3b7c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: isOpen ? '18px' : '19px',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        +
      </button>
    </div>
  );
}
