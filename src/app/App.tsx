import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ShaderImage from '../components/ShaderImage';
import TransitionLayout from '../components/TransitionLayout';
import FloatingPetalsCanvas from '../components/FloatingPetalsCanvas';
import CalligraphyLogo from '../components/CalligraphyLogo';
import BottomDockMenu from '../components/BottomDockMenu';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════
// DATA CONFIGURATIONS (User Portfolio Content)
// ════════════════════════════════════════

const PROJECTS = [
  {
    id: 'weather',
    year: '2026',
    category: 'WEB DEVELOPMENT',
    title: 'WEATHER FORECASTING',
    subtitle: 'w/ Open-Meteo API Integration',
    description: 'Built a fully responsive web weather application utilizing the Open-Meteo API to fetch and render real-time meteorological metrics, temperature indices, and city coordinates. Developed with a high-fashion, clean, and interactive user experience.',
    tech: ['HTML', 'CSS', 'JavaScript', 'API'],
    github: 'https://github.com/bhuyanbarsha618/portfolio',
    img: '/flower1.png',
    bgColor: '#e6e3da', // Light warm gray
    gridSpan: 'col-span-1 md:col-span-7' // Grid sizes for asymmetric grid
  },
  {
    id: 'florasecure',
    year: '2026',
    category: 'DEEP LEARNING / AI',
    title: 'FLORASECURE AI',
    subtitle: 'w/ CNN Deep Learning',
    description: 'An agricultural disease classifier leveraging Convolutional Neural Networks (CNNs) to detect and diagnose foliar crop infections. Bridges domain expertise in Botany with Computer Science to address food security issues.',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    github: 'https://github.com/bhuyanbarsha618/portfolio',
    img: '/flower2.png',
    bgColor: '#dfdbd0', // Slightly darker warm gray
    gridSpan: 'col-span-1 md:col-span-5 md:mt-24'
  }
];

const SKILLS = {
  'Languages & DB': ['C', 'Python', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'DBMS'],
  'Core CS': ['Computer Networks', 'OOPs Concepts', 'Cyber Security', 'AI Concepts'],
  'Tools': ['VS Code', 'Git', 'GitHub', 'Open-Meteo API']
};

const TIMELINE = [
  { year: '2020', title: 'CBSE — 68%', subtitle: 'Harobino Vidya Bhawan, Berhampur' },
  { year: '2022', title: 'CHSE — 58%', subtitle: 'Savitri Women\'s H.S School' },
  { year: '2025', title: 'BSc (Botany Hons.) — 77%', subtitle: 'Berhampur University' },
  { year: '2027', title: 'MCA (In Progress) — CGPA 8.39', subtitle: 'RCM, Bhubaneswar' }
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Top 10 in Academics', year: '2024' },
  { icon: '💃', title: 'Top Dancer in College', year: '2023' },
  { icon: '🧑‍💼', title: 'House Head — SWC Berhampur', year: '2023' },
  { icon: '📋', title: 'Class Representative — SWC Berhampur', year: '2023' },
  { icon: '⚙️', title: 'A Ka Ma — Organized Tech Event', year: '2025' },
  { icon: '🤝', title: 'Brahmashtra — Event Volunteer', year: '2025' }
];

const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'banashree.bhuyan@rcm.ac', href: 'mailto:banashree.bhuyan@rcm.ac' },
  { label: 'LINKEDIN', value: 'Barsha Bhuyan', href: 'https://www.linkedin.com/in/barsha-bhuyan-742007275/' },
  { label: 'GITHUB', value: 'bhuyanbarsha618', href: 'https://github.com/bhuyanbarsha618' }
];

// ════════════════════════════════════════
// SUB-COMPONENTS
// ════════════════════════════════════════

// Custom Bespoke Lag Cursor Component using GSAP quickTo
function BespokeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cursorRef.current) return;

    // Linear interpolation lag physics via GSAP quickTo
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.35, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovered ? 48 : 20,
        height: isHovered ? 48 : 20,
        borderRadius: '50%',
        border: '1px solid var(--text-primary)',
        pointerEvents: 'none',
        zIndex: 999999,
        backgroundColor: isHovered ? 'rgba(78, 59, 124, 0.04)' : 'transparent',
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease'
      }}
    />
  );
}

// ════════════════════════════════════════
// PAGES
// ════════════════════════════════════════

// Main Landing Home Page
function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  // Monitor scroll for fixed background parallax fading
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Stagger ScrollTrigger slide-ins for project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Stagger slide-ins for achievement cards
    const achs = document.querySelectorAll('.ach-card');
    achs.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  const viewportHeight = window.innerHeight;
  const isLandingVisible = scrollY < viewportHeight * 1.1;

  // Calculate opacity & scale based on scroll
  const landingOpacity = Math.max(0, 1 - scrollY / (viewportHeight * 0.8));
  const landingScale = 1 - (scrollY / viewportHeight) * 0.08;

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      
      {/* 1. FIXED BACKGROUND LANDING SCREEN (Natalie Liu style) */}
      {isLandingVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: landingOpacity,
            transform: `scale(${landingScale})`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
          }}
        >
          {/* Interactive 3D Petals Canvas */}
          <FloatingPetalsCanvas />

          {/* Central Calligraphy Logo & Text */}
          <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
            <CalligraphyLogo />
          </div>

          {/* Scroll Down Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '120px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              opacity: Math.max(0, 1 - scrollY / 150),
              transition: 'opacity 0.2s ease'
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.3em',
                color: '#8e8e8a',
                textTransform: 'uppercase',
                fontWeight: 500
              }}
            >
              Scroll to explore
            </span>
            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, #8e8e8a, transparent)',
                animation: 'scrollPulse 2s infinite ease-in-out'
              }}
            />
          </div>
        </div>
      )}

      {/* CSS Keyframes for Pulsing and Hover Styles */}
      <style>{`
        @keyframes scrollPulse {
          0% { transform: scaleY(0.4); opacity: 0.3; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
          100% { transform: scaleY(0.4); opacity: 0.3; transform-origin: top; }
        }
        .bento-card {
          border: 1px solid rgba(26, 26, 26, 0.05);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bento-card:hover {
          border-color: rgba(78, 59, 124, 0.18);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(78, 59, 124, 0.03);
        }
        .skill-tag {
          transition: all 0.2s ease;
        }
        .skill-tag:hover {
          background: #4e3b7c !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* 2. SCROLLABLE MAIN CONTENT (Cream editorial theme, slides OVER landing background) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          marginTop: '100vh', // Start below the viewport to reveal landing screen
          backgroundColor: 'var(--bg-color)', // Solid Cream color `#f5f4f0`
          boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.03)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}
      >
        <div style={{ padding: '100px 6% 120px 6%' }}>
          
          {/* ASYMMETRIC SELECTED WORK GRID */}
          <section id="projects" style={{ scrollMarginTop: '60px' }}>
            <div style={{ marginBottom: '60px' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                Selected Work
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(28px, 5vw, 56px)',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                Creative Projects
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px' }}>
              {PROJECTS.map((proj) => (
                <div key={proj.id} className={`${proj.gridSpan} project-card`}>
                  <Link
                    to={`/projects/${proj.id}`}
                    className="clickable"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    {/* 2:3 Aspect ratio portrait WebGL shader thumbnail */}
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '0.666',
                        background: proj.bgColor,
                        borderRadius: 12,
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.02)'
                      }}
                    >
                      <ShaderImage src={proj.img} />
                    </div>

                    <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {proj.title}
                      </h3>
                      <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {proj.category}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ABOUT / INFO SECTION */}
          <section id="about" style={{ marginTop: '180px', borderTop: '1px solid rgba(26, 26, 26, 0.08)', paddingTop: '100px', scrollMarginTop: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px' }}>
              
              {/* Left Column Portrait */}
              <div className="col-span-12 md:col-span-4" style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '0.75',
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: '#dfdbd0',
                    boxShadow: '0 15px 45px rgba(0,0,0,0.04)'
                  }}
                >
                  <img
                    src="/portrait.png"
                    alt="Portrait"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Right Column Biography & Bento Grid */}
              <div className="col-span-12 md:col-span-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                    display: 'block'
                  }}
                >
                  Biography
                </span>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(20px, 3vw, 32px)',
                    lineHeight: 1.45,
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    marginBottom: '48px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  I am Banashree Subhasmita Bhuyan (known as Barsha), currently pursuing my MCA at Regional College of Management, Bhubaneswar, maintaining a CGPA of 8.39. My background in Botany Honors drives a unique, multi-disciplinary approach to solving code problems.
                </p>

                {/* Bento Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                  
                  {/* Education Timeline */}
                  <div className="bento-card" style={{ padding: '28px', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
                    <h4 className="font-mono" style={{ fontSize: 11, color: '#4e3b7c', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '20px', textTransform: 'uppercase' }}>EDUCATION</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {TIMELINE.map((ed, idx) => (
                        <div key={idx} style={{ borderBottom: '1px dashed rgba(26,26,26,0.06)', paddingBottom: '10px' }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{ed.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: '2px' }}>{ed.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div className="bento-card" style={{ padding: '28px', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
                    <h4 className="font-mono" style={{ fontSize: 11, color: '#4e3b7c', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '20px', textTransform: 'uppercase' }}>TECHNICAL SKILLS</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {Object.entries(SKILLS).map(([cat, list]) => (
                        <div key={cat}>
                          <span className="font-mono" style={{ fontSize: 9, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>{cat.toUpperCase()}</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {list.map((sk) => (
                              <span
                                key={sk}
                                className="font-mono skill-tag clickable"
                                style={{
                                  fontSize: 10,
                                  padding: '4px 10px',
                                  background: 'rgba(78, 59, 124, 0.05)',
                                  color: '#4e3b7c',
                                  borderRadius: 4,
                                  border: '1px solid rgba(78, 59, 124, 0.08)'
                                }}
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* ACHIEVEMENTS SECTION */}
          <section style={{ marginTop: '180px', borderTop: '1px solid rgba(26, 26, 26, 0.08)', paddingTop: '100px' }}>
            <div style={{ marginBottom: '60px' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                Highlights
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(28px, 5vw, 56px)',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                Achievements
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="bento-card ach-card"
                  style={{
                    padding: '30px',
                    background: 'rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(26, 26, 26, 0.05)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ fontSize: '32px' }}>{ach.icon}</div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: '16px',
                        color: 'var(--text-primary)',
                        lineHeight: 1.3
                      }}
                    >
                      {ach.title}
                    </h4>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        marginTop: '8px',
                        display: 'block'
                      }}
                    >
                      {ach.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT & FOOTER SECTION */}
          <section
            id="contact"
            style={{
              marginTop: '180px',
              borderTop: '1px solid rgba(26, 26, 26, 0.08)',
              paddingTop: '120px',
              textAlign: 'center',
              scrollMarginTop: '60px'
            }}
          >
            <h2
              className="font-serif clickable"
              style={{
                fontSize: 'clamp(36px, 8vw, 88px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '60px',
                lineHeight: 1.1
              }}
            >
              Let's work together.
            </h2>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '40px',
                marginBottom: '100px'
              }}
            >
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="clickable font-mono"
                  style={{
                    fontSize: 13,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderBottom: '1.5px solid var(--text-primary)',
                    paddingBottom: '6px',
                    fontWeight: 600,
                    letterSpacing: '0.08em'
                  }}
                >
                  {link.label}: {link.value}
                </a>
              ))}
            </div>

            <div
              className="font-mono"
              style={{
                fontSize: 10,
                color: 'var(--text-secondary)',
                borderTop: '1px solid rgba(26, 26, 26, 0.05)',
                paddingTop: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                letterSpacing: '0.05em'
              }}
            >
              <span>© 2026 BANASHREE S. BHUYAN</span>
              <span>BUILT WITH REACT + GSAP + THREE</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

// Project Detailed Page Layout
function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    // Trigger scroll triggers on load
    ScrollTrigger.refresh();
  }, []);

  if (!project) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Project not found</h2>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="clickable font-mono"
        style={{
          position: 'fixed',
          top: 35,
          left: '6%',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: 12,
          letterSpacing: '0.12em',
          cursor: 'pointer',
          zIndex: 99
        }}
      >
        ← BACK TO WORK
      </button>

      {/* Full-bleed Editorial Header Image */}
      <section
        style={{
          width: '100vw',
          height: '80vh',
          background: project.bgColor,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <img
          src={project.img}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.06))'
          }}
        />

        {/* Floating title overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '6%',
            right: '6%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}
        >
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 6vw, 84px)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            {project.title}
          </h1>
          <span className="font-mono" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{project.year}</span>
        </div>
      </section>

      {/* Details Meta Grid */}
      <section
        style={{
          padding: '80px 6%',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '40px',
          borderBottom: '1px solid rgba(26,26,26,0.08)'
        }}
      >
        <div className="col-span-12 md:col-span-4">
          <h3 className="font-mono" style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>PROJECT DETAIL</h3>
          <span className="font-serif" style={{ fontSize: 24, fontWeight: 700, display: 'block' }}>{project.subtitle}</span>
        </div>

        <div className="col-span-12 md:col-span-5">
          <h3 className="font-mono" style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>DESCRIPTION</h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{project.description}</p>
        </div>

        <div className="col-span-12 md:col-span-3">
          <h3 className="font-mono" style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>TECHNOLOGIES</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tech.map((tc) => (
              <span
                key={tc}
                className="font-mono"
                style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  background: '#dfdbd0',
                  color: 'var(--text-primary)',
                  borderRadius: 4
                }}
              >
                {tc}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="clickable"
            style={{
              display: 'inline-block',
              marginTop: 24,
              fontFamily: "'Syne', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: 'var(--text-primary)',
              color: '#f5f4f0',
              padding: '12px 28px',
              borderRadius: 30,
              textDecoration: 'none'
            }}
          >
            VIEW CODEBASE ↗
          </a>
        </div>
      </section>

      {/* Subpage gallery renders */}
      <section
        style={{
          padding: '120px 6%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '120px'
        }}
      >
        <div
          style={{
            width: 'clamp(280px, 45vw, 680px)',
            aspectRatio: '0.75',
            borderRadius: 8,
            overflow: 'hidden',
            background: project.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={project.img}
            alt=""
            style={{ height: '70%', width: 'auto', filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.06))' }}
          />
        </div>

        <div
          style={{
            width: 'clamp(280px, 45vw, 680px)',
            aspectRatio: '0.75',
            borderRadius: 8,
            overflow: 'hidden',
            background: project.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={project.img}
            alt=""
            style={{ height: '55%', width: 'auto', transform: 'scaleX(-1) rotate(15deg)', filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.06))' }}
          />
        </div>
      </section>
    </div>
  );
}

// ════════════════════════════════════════
// CORE ROUTER APP WRAPPER
// ════════════════════════════════════════

export default function App() {
  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker RAF loop with Lenis
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Noise Grain filter overlay */}
      <div className="noise-overlay" />
      
      {/* Bespoke lag cursor */}
      <BespokeCursor />

      {/* Bottom Floating Dock Navigation Menu */}
      <BottomDockMenu />

      {/* Transition curtain Layout Wrapper */}
      <TransitionLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </TransitionLayout>
    </BrowserRouter>
  );
}
