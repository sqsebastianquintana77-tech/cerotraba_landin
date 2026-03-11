import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function Header({ onCtaClick }) {
  const headerRef = useRef(null);

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
        className="flex items-center justify-between px-7 py-4 rounded-[3rem] border border-transparent transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="CeroTraba" className="h-8 md:h-10" />
        </div>

        <nav className="hidden md:flex gap-10 text-xs font-sans font-medium tracking-[0.2em] uppercase text-ghost/60">
          <a href="#features"   className="hover:text-plasma transition-colors duration-300">Soluciones</a>
          <a href="#philosophy" className="hover:text-plasma transition-colors duration-300">Filosofía</a>
          <a href="#protocol"   className="hover:text-plasma transition-colors duration-300">Proceso</a>
        </nav>

        <MagneticButton onClick={onCtaClick} className="text-xs px-6 py-3">
          ¡Quiero eliminar mis trabas ahora!
        </MagneticButton>
      </div>
    </header>
  );
}
