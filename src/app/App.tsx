import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ShaderImage from '../components/ShaderImage';
import TransitionLayout from '../components/TransitionLayout';

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

const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'banashree.bhuyan@rcm.ac', href: 'mailto:banashree.bhuyan@rcm.ac' },
  { label: 'LINKEDIN', value: 'Barsha Bhuyan', href: 'https://www.linkedin.com/in/barsha-bhuyan-742007275/' },
  { label: 'GITHUB', value: 'bhuyanbarsha618', href: 'https://github.com/bhuyanbarsha618' }
];

// ════════════════════════════════════════
// SUB-COMPONENTS
// ════════════════════════════════════════

// Minimal Fixed Top Navigation Bar
function HeaderBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '90px',
        padding: '0 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9999,
        mixBlendMode: 'difference' // Elegant visual overlap
      }}
    >
      <Link
        to="/"
        className="clickable font-mono"
        style={{
          fontSize: 14,
          color: '#ffffff', // Mix-blend turns this black on cream
          textDecoration: 'none',
          letterSpacing: '0.12em',
          fontWeight: 700
        }}
      >
        BANASHREE S. BHUYAN
      </Link>

      <button
        onClick={onMenuToggle}
        className="clickable"
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          width: 32,
          cursor: 'pointer'
        }}
      >
        <div style={{ width: '100%', height: 2, backgroundColor: '#ffffff' }} />
        <div style={{ width: '100%', height: 2, backgroundColor: '#ffffff' }} />
      </button>
    </header>
  );
}

// Fullscreen Hamburg Navigation Menu Overlay
function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Animate overlay entrance
      gsap.to(overlayRef.current, {
        y: '0%',
        duration: 0.65,
        ease: 'power3.out'
      });

      // Stagger animate links rising from bottom
      const links = linksRef.current?.querySelectorAll('.menu-link-wrapper span');
      if (links) {
        gsap.fromTo(
          links,
          { y: '100%' },
          {
            y: '0%',
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      }
    } else {
      // Animate overlay slide out
      gsap.to(overlayRef.current, {
        y: '-100%',
        duration: 0.65,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a1a1a', // Black background overlay
        color: '#f5f4f0',
        zIndex: 99999,
        transform: 'translateY(-100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10%'
      }}
    >
      {/* Absolute Close Button */}
      <button
        onClick={onClose}
        className="clickable font-mono"
        style={{
          position: 'absolute',
          top: 35,
          right: '6%',
          background: 'none',
          border: 'none',
          color: '#f5f4f0',
          fontSize: 13,
          letterSpacing: '0.12em',
          cursor: 'pointer'
        }}
      >
        CLOSE ✕
      </button>

      <div ref={linksRef} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="menu-link-wrapper" style={{ overflow: 'hidden' }}>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="font-serif clickable"
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 800,
              textDecoration: 'none',
              color: '#f5f4f0',
              display: 'inline-block',
              lineHeight: 1.1
            }}
          >
            <span style={{ display: 'inline-block' }}>HOME</span>
          </Link>
        </div>

        <div className="menu-link-wrapper" style={{ overflow: 'hidden' }}>
          <a
            href="#projects"
            onClick={handleLinkClick}
            className="font-serif clickable"
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 800,
              textDecoration: 'none',
              color: '#f5f4f0',
              display: 'inline-block',
              lineHeight: 1.1
            }}
          >
            <span style={{ display: 'inline-block' }}>WORK</span>
          </a>
        </div>

        <div className="menu-link-wrapper" style={{ overflow: 'hidden' }}>
          <a
            href="#about"
            onClick={handleLinkClick}
            className="font-serif clickable"
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 800,
              textDecoration: 'none',
              color: '#f5f4f0',
              display: 'inline-block',
              lineHeight: 1.1
            }}
          >
            <span style={{ display: 'inline-block' }}>ABOUT</span>
          </a>
        </div>

        <div className="menu-link-wrapper" style={{ overflow: 'hidden' }}>
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="font-serif clickable"
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 800,
              textDecoration: 'none',
              color: '#f5f4f0',
              display: 'inline-block',
              lineHeight: 1.1
            }}
          >
            <span style={{ display: 'inline-block' }}>CONTACT</span>
          </a>
        </div>
      </div>
    </div>
  );
}

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
        backgroundColor: isHovered ? 'rgba(26, 26, 26, 0.05)' : 'transparent',
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
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // 1. Stagger load-in for display header title
    const titleLines = titleRef.current?.querySelectorAll('.title-line span');
    if (titleLines) {
      gsap.fromTo(
        titleLines,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );
    }

    // 2. Stagger ScrollTrigger slide-ins for project cards
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

    // 3. Line-by-line reveal for About bio on scroll
    if (bioRef.current) {
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <div style={{ width: '100%', padding: '0 6% 120px 6%' }}>
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 160
        }}
      >
        <div ref={titleRef} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title-line" style={{ overflow: 'hidden', height: '1.2em' }}>
            <span
              className="font-serif"
              style={{
                fontSize: 'clamp(54px, 10vw, 130px)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                display: 'inline-block',
                lineHeight: 1.0,
                letterSpacing: '-0.02em'
              }}
            >
              BANASHREE S.
            </span>
          </div>
          <div className="title-line" style={{ overflow: 'hidden', height: '1.2em' }}>
            <span
              className="font-serif"
              style={{
                fontSize: 'clamp(54px, 10vw, 130px)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                display: 'inline-block',
                lineHeight: 1.0,
                letterSpacing: '-0.02em'
              }}
            >
              BHUYAN
            </span>
          </div>
        </div>

        <p
          className="font-mono"
          style={{
            fontSize: 12,
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginTop: 40,
            textTransform: 'uppercase'
          }}
        >
          MCA STUDENT / TECH ENTHUSIAST & DEVELOPER
        </p>
      </section>

      {/* ASYMMETRIC PROJECT GRID */}
      <section id="projects" style={{ marginTop: 80 }}>
        <h2
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: 48,
            borderBottom: '1px solid rgba(26, 26, 26, 0.08)',
            paddingBottom: 16
          }}
        >
          SELECTED WORK
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
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
                    borderRadius: 8,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <ShaderImage src={proj.img} />
                </div>

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: 22,
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
      <section id="about" style={{ marginTop: 180, borderTop: '1px solid rgba(26, 26, 26, 0.08)', paddingTop: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
          {/* Left Column Portrait */}
          <div className="col-span-12 md:col-span-4" style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '0.75',
                borderRadius: 8,
                overflow: 'hidden',
                background: '#dfdbd0'
              }}
            >
              <img
                src="/portrait.png"
                alt="Portrait"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right Column Text */}
          <div className="col-span-12 md:col-span-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: 20, display: 'block' }}
            >
              ABOUT ME
            </span>
            <p
              ref={bioRef}
              className="font-serif"
              style={{
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                fontWeight: 600,
                marginBottom: 32
              }}
            >
              I am Banashree Subhasmita Bhuyan (known as Barsha), currently pursuing my MCA at Regional College of Management, Bhubaneswar, maintaining a CGPA of 8.39. My background in Botany Honors drives a unique, multi-disciplinary approach to solving code problems.
            </p>

            {/* Bento details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 20 }}>
              <div>
                <h4 className="font-mono" style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>EDUCATION</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {TIMELINE.map((ed, idx) => (
                    <div key={idx} style={{ borderBottom: '1px dashed rgba(26,26,26,0.06)', paddingBottom: 6 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{ed.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{ed.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono" style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>TECHNICAL SKILLS</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.entries(SKILLS).map(([cat, list]) => (
                    <div key={cat}>
                      <span className="font-mono" style={{ fontSize: 9, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{cat.toUpperCase()}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {list.map((sk) => (
                          <span
                            key={sk}
                            className="font-mono"
                            style={{
                              fontSize: 10,
                              padding: '2px 8px',
                              background: '#dfdbd0',
                              color: 'var(--text-primary)',
                              borderRadius: 4
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

      {/* FOOTER & CTA */}
      <section
        id="contact"
        style={{
          marginTop: 180,
          borderTop: '1px solid rgba(26, 26, 26, 0.08)',
          paddingTop: 100,
          textAlign: 'center'
        }}
      >
        <h2
          className="font-serif clickable"
          style={{
            fontSize: 'clamp(36px, 8vw, 88px)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 60
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
            marginBottom: 80
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
                paddingBottom: 4
              }}
            >
              {link.label}: {link.value}
            </a>
          ))}
        </div>

        <div
          className="font-mono"
          style={{
            fontSize: 11,
            color: 'var(--text-secondary)',
            borderTop: '1px solid rgba(26, 26, 26, 0.04)',
            paddingTop: 40,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>© 2026 BANASHREE S. BHUYAN</span>
          <span>BUILT WITH REACT + GSAP + THREE</span>
        </div>
      </section>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Header and Menu Navigation */}
      <HeaderBar onMenuToggle={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

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
