You are an expert React developer and premium UI/UX designer. Build a complete, 
production-grade, single-page portfolio website as a single .jsx file for 
Banashree Subhasmita Bhuyan (known as Barsha), an MCA student at RCM Bhubaneswar 
seeking Summer Placements 2026. This portfolio must be visually unforgettable, 
technically flawless, and 100% unique — not resembling any generic AI-generated 
portfolio template.

════════════════════════════════════════
PERSONAL INFORMATION
════════════════════════════════════════
Full Name       : Banashree Subhasmita Bhuyan
Nickname        : Barsha
Email           : banashree.bhuyan@rcm.ac
LinkedIn        : https://www.linkedin.com/in/barsha-bhuyan-742007275/
GitHub          : https://github.com/bhuyanbarsha618
College         : Regional College of Management (RCM), Bhubaneswar
Degree          : MCA — 2nd Semester (Continuing), CGPA 8.39, Expected 2027
Context         : Summer Placements 2026

════════════════════════════════════════
EDUCATION TIMELINE
════════════════════════════════════════
2020 → CBSE — 68% — Harobino Vidya Bhawan, Berhampur, Ganjam
2022 → CHSE — 58% — Savitri Women's H.S School, Bhanjanagar, Ganjam
2025 → BSc (Botany Hons.) — 77% — Berhampur University
2027 → MCA (In Progress) — CGPA 8.39 — RCM, Bhubaneswar

════════════════════════════════════════
TECHNICAL SKILLS
════════════════════════════════════════
Programming Languages : C, Python (Basic), HTML, CSS, JavaScript
Database              : DBMS Concepts, MySQL
Core Computer Science : Computer Networks, OOPs Concepts
Tools                 : VS Code, Git & GitHub
Areas of Interest     : Web Development, Cyber Security, Artificial Intelligence

════════════════════════════════════════
ACADEMIC PROJECTS
════════════════════════════════════════
Project Title  : Weather Forecasting System
Year           : 2026
Tech Stack     : HTML, CSS, JavaScript, Open-Meteo API
Description    : Built a fully responsive web-based weather application that 
                 integrates the Open-Meteo API to fetch and display real-time 
                 weather data including temperature, wind speed, and city 
                 information. Focused on clean, user-friendly UI design.
GitHub Link    : https://github.com/bhuyanbarsha618/portfolio

════════════════════════════════════════
ACHIEVEMENTS & POSITIONS OF RESPONSIBILITY
════════════════════════════════════════
- Top 10 in Academics (2024)
- Among Top Dancers in College (2023)
- House Head — SWC, Berhampur (2023)
- Class Representative — SWC, Berhampur (2023)
- A Ka Ma — Assisted in organizing college technical event (2025)
- Brahmashtra — Volunteered for college event (2025)

════════════════════════════════════════
DESIGN VISION & AESTHETIC DIRECTION
════════════════════════════════════════
Theme           : Dark luxury tech editorial
Mood            : Premium, minimal, confident, forward-thinking
Primary BG      : #090E14 (deep navy black)
Accent Color    : #7FECEC (teal cyan) — the ONLY accent, used sparingly
Text Primary    : #E8F4F4
Text Muted      : rgba(232, 244, 244, 0.45)
Card Background : rgba(255, 255, 255, 0.025)
Card Border     : rgba(127, 236, 236, 0.10)
Card Border Hover: rgba(127, 236, 236, 0.35)

STRICTLY FORBIDDEN aesthetics:
- Purple gradients on white backgrounds
- Rainbow or multi-color schemes
- Inter / Roboto / Arial / System fonts
- Cookie-cutter hero layouts with circular profile photos
- Generic gradient name effects in multiple colors
- Confetti, excessive particles, or busy backgrounds

════════════════════════════════════════
TYPOGRAPHY
════════════════════════════════════════
Load via @import inside a <style> tag:
  https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900
  &family=DM+Sans:wght@300;400;500;600&display=swap

Headings   : Syne, weight 900, letter-spacing -0.03em to -0.04em
Body       : DM Sans, weight 400, line-height 1.8
Labels     : Syne, weight 700, font-size 11px, letter-spacing 0.26em, 
             text-transform uppercase, color #7FECEC
Nav Links  : Syne, weight 600, font-size 13px, letter-spacing 0.12em, uppercase

════════════════════════════════════════
UNIQUE INTERACTIVE FEATURES (all required)
════════════════════════════════════════
1. CUSTOM CURSOR
   - Small filled teal dot (12×12px) following mouse precisely
   - Larger ghost ring (36px) following with slight lag
   - Ring expands to 48px when hovering over any clickable element
   - mix-blend-mode: difference on the dot for visual interest
   - Hide default cursor on entire page (cursor: none)

2. TYPEWRITER ROLE ANIMATOR
   - Cycles through: "MCA Student" → "Web Developer" → 
     "Cyber Security Enthusiast" → "AI Explorer"
   - Types forward character by character, pauses 1.4s, then deletes
   - Uses setInterval with a ref-based state machine (no libraries)
   - Blinking caret (2px wide, teal, CSS keyframe animation)

3. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   - Every section and card fades in + rises 32px on scroll into view
   - Uses IntersectionObserver inside a reusable <FadeIn> component
   - Accepts a delay prop (seconds) for staggered children
   - Once visible, animation does not reverse

4. HERO DOT-GRID BACKGROUND
   - CSS background-image with two linear-gradients forming a grid
   - Grid line color: rgba(127, 236, 236, 1), grid size: 60×60px
   - Overall opacity: 0.04 — extremely subtle, atmospheric only

5. FLOATING GLOW ORB IN HERO
   - Absolutely positioned in top-right of hero section
   - Radial gradient from rgba(127,236,236,0.18) → transparent
   - CSS keyframe "float" animation: translateY 0 → -14px → 0, 6s ease-in-out infinite
   - Adds depth and visual focus without distracting

6. STICKY FROSTED-GLASS NAV
   - Initially fully transparent, no border
   - On scroll > 40px: background rgba(9,14,20,0.92) + backdrop-filter blur(18px)
   - Bottom border appears: 1px solid rgba(127,236,236,0.08)
   - Smooth CSS transition on all properties, 0.4s

7. SECTION LABEL PATTERN
   - Every section starts with: [decorative line] LABEL TEXT
   - Decorative line: inline-block, 40px wide, 1px tall, teal, opacity 0.4
   - Label: 11px Syne, 700 weight, #7FECEC, 0.28em letter-spacing, uppercase
   - Followed by large section heading in Syne 900

8. ANIMATED SCROLL INDICATOR IN HERO
   - Bottom-center of hero: vertical line (1px wide, 40px tall, teal)
   - Below it: "SCROLL" text in 10px uppercase 0.2em tracking
   - CSS keyframe "pulse" on opacity 0.6 → 1 → 0.6, 2s infinite
   - Fades out naturally as user scrolls past

9. CARD HOVER MICRO-INTERACTIONS
   - All cards: border-color transitions to rgba(127,236,236,0.35)
   - Cards lift: transform translateY(-4px)
   - Smooth transition: 0.3s ease on both
   - Skill tags individually hover: background teal tint + text becomes #7FECEC

10. CUSTOM TEAL SCROLLBAR
    - ::-webkit-scrollbar width 4px
    - Track: #090E14
    - Thumb: rgba(127,236,236,0.25), border-radius 2px

════════════════════════════════════════
PAGE STRUCTURE & SECTIONS
════════════════════════════════════════

─── SECTION 1: NAVIGATION ───────────────
Fixed top bar, full width, z-index 100.
Left  : Logo "BB." — Syne 800, 22px, #7FECEC, click scrolls to Home
Center: Nav links — Home | About | Skills | Projects | Achievements | Contact
        Active link has teal bottom border, inactive links are muted
Right : "Hire Me →" button — teal filled, compact (10px 22px padding)
Mobile: Hide nav links, keep logo and CTA button

─── SECTION 2: HERO ─────────────────────
Full viewport height (100vh), vertically centered content.
Dot-grid overlay (full section, absolute, pointer-events none)
Floating glow orb (absolute, top-right, animated)

Content (z-index 2, max-width 800px):
  - Section label: "Summer Placements 2026 — RCM Bhubaneswar"
  - Main heading (stacked on 3 lines):
      "Banashree"
      "Subhasmita"  
      "Bhuyan"
    Font: Syne 900, clamp(44px, 7vw, 96px), letter-spacing -0.04em
    Color: linear-gradient(120deg, #E8F4F4 30%, #7FECEC 100%) — text fill only
  - Typewriter line: current role + blinking caret, #7FECEC, Syne 700, 28px
  - Tagline: "Passionate about building elegant digital experiences at the 
    intersection of web development, cybersecurity, and AI."
    DM Sans 400, 18px, muted color, max-width 500px
  - Two CTA buttons side by side:
      Primary: "View Projects ↓" — teal filled, scrolls to Projects section
      Ghost  : "GitHub ↗" — teal outline, opens GitHub in new tab

Scroll indicator: bottom-center, pulsing

─── SECTION 3: ABOUT ────────────────────
Two-column grid (1fr 1fr), gap 64px.
Left column — Biography:
  Paragraph 1: Introduce Barsha, MCA student CGPA 8.39, unusual journey from 
               Botany to CS, explain it as cross-disciplinary strength
  Paragraph 2: Active exploration of web dev, cybersecurity, and AI; 
               building projects bridging real-world problems with tech solutions
  Two buttons: "LinkedIn ↗" (primary) + "GitHub ↗" (ghost)

Right column — Education Timeline:
  Vertical timeline with left border line (1px teal, 15% opacity)
  Each item has:
    - Glowing dot (12px circle, teal, box-shadow teal glow) on the border line
    - Year label above in uppercase teal 11px
    - Title: "Degree — Score" in Syne 800 18px
    - Subtitle: Institution name in DM Sans muted 13px
  Four items: CBSE 2020, CHSE 2022, BSc 2025, MCA 2027*

─── SECTION 4: SKILLS ───────────────────
Grid layout: repeat(auto-fill, minmax(280px, 1fr)), gap 24px
Five skill group cards:
  1. Programming Languages — C, Python (Basic), HTML, CSS, JavaScript
  2. Database Management — DBMS Concepts, MySQL
  3. Core Computer Science — Computer Networks, OOPs Concepts
  4. Tools — VS Code, Git & GitHub
  5. Areas of Interest — Web Development, Cyber Security, Artificial Intelligence

Each card:
  - Group title: 11px teal uppercase label
  - Skill tags: pill/tag style, teal-tinted background, teal border
  - Card has card-hover class behavior

─── SECTION 5: PROJECTS ─────────────────
Featured project card (full width, large):
  - "FEATURED" badge in top-left (small teal outlined pill)
  - Year "2026" in top-right (11px teal uppercase)
  - Title: "Weather Forecasting System" — Syne 900 24px
  - Description: Full paragraph about the project
  - Tech tags: HTML, CSS, JavaScript, API
  - "View on GitHub ↗" ghost button linking to GitHub repo

─── SECTION 6: ACHIEVEMENTS ─────────────
Achievement grid: repeat(auto-fill, minmax(260px, 1fr)), gap 20px
Six achievement cards, each with:
  - Large emoji icon (28px)
  - Achievement label (Syne 700 15px)
  - Year (11px teal uppercase tracking)
Cards:
  🏆 Top 10 in Academics — 2024
  💃 Top Dancer in College — 2023
  🧑‍💼 House Head — SWC Berhampur — 2023
  📋 Class Representative — SWC Berhampur — 2023
  ⚙️ A Ka Ma — Tech Event Organizer — 2025
  🤝 Brahmashtra — Volunteer — 2025

─── SECTION 7: CONTACT ──────────────────
Two-column layout:
Left:
  Paragraph: "I'm actively looking for summer placement opportunities. If 
  you're looking for a motivated developer with a hunger to learn and grow 
  — let's talk."
  "Send Email →" primary button (mailto link)

Right — Three contact link cards (full width, horizontal layout each):
  ✉️ EMAIL — banashree.bhuyan@rcm.ac — mailto link
  💼 LINKEDIN — Barsha Bhuyan — LinkedIn URL
  🐙 GITHUB — bhuyanbarsha618 — GitHub URL
  Each card: left-facing icon, label above (11px teal), value below (14px)
  Hover: translateX(4px) + border brightens

─── SECTION 8: FOOTER ───────────────────
Thin top border (teal 7% opacity)
Left : "© 2026 Banashree Subhasmita Bhuyan. All rights reserved."
Right: "MCA @ RCM Bhubaneswar" — 13px teal-muted

════════════════════════════════════════
TECHNICAL CONSTRAINTS
════════════════════════════════════════
Framework       : React (functional components + hooks only)
File format     : Single .jsx file with default export
Styling         : 100% inline styles + one <style> tag inside return()
                  for keyframes, hover classes, scrollbar, and media queries
CSS Libraries   : None (no Tailwind, no styled-components, no CSS modules)
Animation Libs  : None (no Framer Motion, no GSAP) — pure CSS + JS only
External Deps   : Only React (useState, useEffect, useRef)
Fonts           : Google Fonts via @import in <style> tag
No <form> tags  : Use onClick handlers only for interactivity
Images          : No photos — use initials, typography, and abstract shapes
Responsive      : Must work on mobile — use clamp() for font sizes, 
                  CSS grid auto-fill, and hide nav links on small screens
Performance     : IntersectionObserver instead of scroll event listeners
                  requestAnimationFrame for cursor movement if needed

════════════════════════════════════════
CODE ARCHITECTURE
════════════════════════════════════════
Constants (top of file, outside component):
  NAV_LINKS   : array of section names
  SKILLS      : object mapping group name → array of skill strings
  PROJECTS    : array of project objects
  TIMELINE    : array of education objects
  ACHIEVEMENTS: array of achievement objects

Reusable Components:
  <Cursor />   — custom cursor component, uses useState for position + size
  <FadeIn />   — scroll-triggered wrapper, uses useRef + useInView hook
  useInView()  — custom hook using IntersectionObserver

Main Component:
  <Portfolio /> — default export
  State: active section, menuOpen (mobile), scrolled (nav), typed (typewriter)
  Refs: roleRef, charRef, deletingRef for typewriter state machine
  All styles defined as a single `styles` object inside the component

════════════════════════════════════════
QUALITY STANDARDS
════════════════════════════════════════
- Zero console errors or warnings
- All external links open in new tab with rel="noreferrer"
- Smooth scroll between sections via scrollIntoView({ behavior: 'smooth' })
- All interactive elements have data-hover="true" for cursor enlargement
- Consistent spacing: sections use padding 100px 8vw
- All animations use CSS transitions or keyframes — no janky JS-driven animation
- Color system uses CSS variables or the defined hex values consistently
- The final output must feel like a $5000 freelance portfolio, not a tutorial project