import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/ui/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LeadForm from './components/ui/LeadForm';

gsap.registerPlugin(ScrollTrigger);

function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        opacity: 0.04,
      }}
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function App() {
  const appRef = useRef(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = React.useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => { }, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={appRef}
      className="relative min-h-screen bg-void text-ghost selection:bg-plasma selection:text-ghost flex flex-col font-sans"
    >
      <CustomCursor />
      <NoiseOverlay />
      <Header onCtaClick={openLeadForm} />
      <main className="relative z-10 w-full flex flex-col">
        <Hero onCtaClick={openLeadForm} />
        <Features />
        <Philosophy />
        <Protocol />
        <Footer onCtaClick={openLeadForm} />
      </main>
      <Chatbot />
      <LeadForm isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </div>
  );
}

export default App;
