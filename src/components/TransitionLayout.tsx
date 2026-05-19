import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'animating'>('idle');
  
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip curtain animation on initial load to maintain page speed scores
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location.pathname === displayLocation.pathname) return;

    setTransitionStage('animating');

    // Sweep GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTransitionStage('idle');
      }
    });

    // 1. Sweep curtain up from bottom to cover viewport
    tl.to(curtainRef.current, {
      y: '0%',
      duration: 0.45,
      ease: 'power2.inOut'
    });

    // 2. Midpoint: Update visible content while hidden behind curtain
    tl.add(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0); // Reset scroll position to top
    });

    // 3. Sweep curtain off the top to reveal new page
    tl.to(curtainRef.current, {
      y: '-100%',
      duration: 0.45,
      ease: 'power2.inOut'
    });

    // 4. Reset curtain position to bottom silently
    tl.set(curtainRef.current, {
      y: '100%'
    });

    return () => {
      tl.kill();
    };
  }, [location, displayLocation.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Dynamic Content Container */}
      <div style={{ opacity: transitionStage === 'animating' ? 0.3 : 1, transition: 'opacity 0.25s ease' }}>
        {children}
      </div>

      {/* Full-screen sweep transition curtain */}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#5e4b3c', // Warm dark earth tone
          transform: 'translateY(100%)',
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
