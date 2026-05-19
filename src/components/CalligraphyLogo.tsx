import React from 'react';

interface CalligraphyLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function CalligraphyLogo({ className = '', style = {} }: CalligraphyLogoProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        ...style
      }}
    >
      {/* 
        Custom calligraphic brand mark.
        Designed with elegant fluid Bezier curves representing the brush strokes of B's.
      */}
      <svg
        viewBox="0 0 500 350"
        width="100%"
        height="100%"
        style={{ maxWidth: '420px', height: 'auto', display: 'block' }}
      >
        <defs>
          <linearGradient id="inkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b0b0d" />
            <stop offset="50%" stopColor="#1a1a1f" />
            <stop offset="100%" stopColor="#08080a" />
          </linearGradient>
          <filter id="inkGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.05" />
          </filter>
        </defs>

        <g filter="url(#inkGlow)" fill="url(#inkGrad)">
          {/* Sweeping main vertical stem brush stroke */}
          <path d="M 120 70 C 130 50, 190 20, 210 50 C 230 80, 190 140, 180 180 C 170 220, 190 270, 240 280 C 270 285, 290 260, 300 230 C 310 200, 290 140, 250 140 C 210 140, 195 190, 220 220 C 240 240, 280 230, 275 195 C 270 170, 235 175, 235 195 C 235 210, 260 210, 260 190 C 260 180, 250 180, 245 185 C 240 190, 240 200, 245 200 C 255 200, 250 160, 230 160 C 200 160, 180 210, 190 240 C 200 270, 230 300, 280 295 C 330 290, 360 220, 340 150 C 320 80, 240 40, 170 80 C 120 110, 100 160, 115 200 C 130 240, 180 230, 185 200 C 190 170, 160 150, 140 170 C 125 185, 130 210, 145 215 C 160 220, 175 190, 165 175 C 155 160, 140 165, 142 185 C 144 200, 160 195, 155 180 C 150 165, 135 170, 140 190" />
          
          {/* Dynamic flourishes & swashes */}
          <path d="M 215 35 C 225 15, 260 0, 285 20 C 310 40, 290 85, 265 105 C 240 125, 210 120, 212 95 C 214 70, 250 50, 270 70 C 290 90, 240 110, 230 85 C 220 60, 260 30, 265 50 C 270 70, 240 85, 235 70 C 230 55, 245 45, 250 48" />
          
          <path d="M 130 110 C 115 100, 75 120, 90 145 C 105 170, 150 160, 170 140 C 190 120, 185 90, 160 80 C 135 70, 110 90, 125 115 C 140 140, 180 130, 165 110 C 150 90, 125 100, 135 115 C 145 130, 155 115, 148 110" />

          {/* Large bottom swooping horizontal ribbon */}
          <path d="M 180 260 C 210 280, 250 310, 310 300 C 370 290, 420 220, 415 180 C 410 140, 355 120, 315 150 C 275 180, 280 230, 320 250 C 360 270, 400 230, 395 190 C 390 150, 340 140, 320 170 C 300 200, 310 240, 345 242 C 380 244, 385 210, 370 190 C 355 170, 330 180, 335 210 C 340 240, 370 230, 360 205 C 350 180, 325 195, 335 220 C 345 245, 360 215, 350 205" />
          
          {/* Splashes / Dots (Simulating brush ink splatters) */}
          <circle cx="280" cy="115" r="5" />
          <circle cx="160" cy="60" r="3.5" />
          <circle cx="340" cy="270" r="4.5" />
          <circle cx="105" cy="180" r="3" />
          <circle cx="210" cy="265" r="4" />
        </g>
      </svg>

      {/* Spaced Elegant Typography */}
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 4vw, 42px)',
          letterSpacing: '0.24em',
          color: '#1a1a1a',
          marginTop: '32px',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1.1
        }}
      >
        Barsha Bhuyan
      </h1>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.36em',
          color: '#6e6e6a',
          marginTop: '12px',
          textTransform: 'uppercase',
          fontWeight: 500,
          textAlign: 'center'
        }}
      >
        MCA Student & Web Developer
      </p>
    </div>
  );
}
