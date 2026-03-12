import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function Header({ onCtaClick }) {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 'top -100',
        onEnter: () => {
          gsap.to(el, {
            backgroundColor: 'rgba(10, 10, 20, 0.85)',
            borderColor: 'rgba(123, 97, 255, 0.3)',
            duration: 0.4,
            ease: 'power2.out',
          });
          el.style.backdropFilter = 'blur(20px)';
        },
        onLeaveBack: () => {
          gsap.to(el, {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            duration: 0.4,
            ease: 'power2.out',
          });
          el.style.backdropFilter = 'none';
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div
        ref={headerRef}
        className="flex items-center justify-between px-5 md:px-7 py-3 md:py-4 rounded-full md:rounded-[3rem] border border-transparent transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="CeroTraba" className="h-7 md:h-10" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-10 text-xs font-sans font-medium tracking-[0.2em] uppercase text-ghost/60">
          <a href="#features"   className="hover:text-plasma transition-colors duration-300">Soluciones</a>
          <a href="#philosophy" className="hover:text-plasma transition-colors duration-300">Filosofía</a>
          <a href="#protocol"   className="hover:text-plasma transition-colors duration-300">Proceso</a>
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton onClick={onCtaClick} className="text-[10px] md:text-xs px-4 md:px-6 py-2.5 md:py-3 whitespace-nowrap">
            <span className="hidden sm:inline">¡Quiero eliminar mis trabas ahora!</span>
            <span className="sm:hidden">Empezar ahora</span>
          </MagneticButton>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <span className={`w-5 h-0.5 bg-ghost transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-ghost transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-ghost transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Content */}
      <div className={`lg:hidden fixed inset-0 top-[4.5rem] bg-void/95 backdrop-blur-xl transition-all duration-500 z-[-1] overflow-hidden ${isMenuOpen ? 'h-[calc(100vh-5rem)] opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-lg font-sans font-medium tracking-[0.2em] uppercase text-ghost">
          <a href="#features"   onClick={() => setIsMenuOpen(false)} className="hover:text-plasma transition-colors">Soluciones</a>
          <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="hover:text-plasma transition-colors">Filosofía</a>
          <a href="#protocol"   onClick={() => setIsMenuOpen(false)} className="hover:text-plasma transition-colors">Proceso</a>
        </nav>
      </div>
    </header>
  );
}
