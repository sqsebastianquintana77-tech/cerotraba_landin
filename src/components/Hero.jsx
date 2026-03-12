import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from './ui/Button';

export default function Hero({ onCtaClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 100, opacity: 0, stagger: 0.12, duration: 1.8, ease: 'power3.out', delay: 0.3,
      });
      gsap.from('.hero-line', {
        scaleX: 0, transformOrigin: 'left center', duration: 2.2, ease: 'power4.out', delay: 0.9,
      });
      // Floating animation
      gsap.to('.hero-orb', {
        y: -30, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.8,
      });

      // Mouse parallax for orbs
      const xTo = gsap.quickTo('.hero-orb', "x", { duration: 1, ease: "power3" });
      const yParallaxTo = gsap.quickTo('.hero-orb', "y", { duration: 1, ease: "power3" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 60; // Max move 30px
        const y = (clientY / window.innerHeight - 0.5) * 60;
        xTo(x);
        yParallaxTo(y); // This overlays on top of the floating animation due to GSAP handling
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-void">
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop"
          alt="Bioluminescent dark water technology"
          className="w-full h-full object-cover opacity-30 md:opacity-40 saturate-50 mix-blend-screen mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(123,97,255,0.18),transparent)]" />
      </div>

      {/* Orbs */}
      <div className="hero-orb absolute top-[20%] left-[10%] w-48 md:w-64 h-48 md:h-64 rounded-full bg-plasma/10 blur-[60px] md:blur-[90px] pointer-events-none mix-blend-screen" />
      <div className="hero-orb absolute top-[35%] right-[5%] w-64 md:w-96 h-64 md:h-96 rounded-full bg-plasma/10 blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-12">
        <div className="flex-1">
          <div className="hero-line w-16 md:w-20 h-px bg-plasma mb-6 md:mb-8" />
          <p className="hero-text font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-plasma uppercase mb-4 md:mb-6">
            Agencia de Automatizaciones · IA Estratégica
          </p>
          <h1 className="hero-text font-sans font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] lg:leading-[0.88] tracking-tighter text-ghost uppercase">
            Si es repetitivo,<br />
            <span className="font-serif italic font-normal text-plasma lowercase text-glow-plasma">
              lo automatizamos.
            </span>
          </h1>
          <h2 className="hero-text font-sans font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] lg:leading-[0.88] tracking-tighter text-ghost/30 uppercase mt-2">
            Si es un obstáculo,<br />
            <span className="font-serif italic font-normal text-ghost/20 lowercase">lo eliminamos.</span>
          </h2>
        </div>
        <div className="hero-text w-full md:max-w-[450px] lg:w-[400px] flex flex-col gap-6 md:gap-7 lg:pb-10">
          <p className="font-sans text-sm md:text-base lg:text-lg text-ghost/75 leading-relaxed">
            Liberamos el potencial de negocios y emprendedores automatizando lo repetitivo para que su única preocupación sea{' '}
            <span className="text-plasma font-semibold">crecer.</span>
          </p>
          <MagneticButton onClick={onCtaClick} className="self-start text-xs md:text-sm px-6 md:px-8 py-3.5 md:py-4 w-full text-center">
            ¡Quiero eliminar mis trabas ahora!
          </MagneticButton>
          <p className="font-mono text-[10px] md:text-xs text-ghost/40 leading-relaxed">
            Agenda una consultoría ágil y descubre qué<br className="hidden sm:block" />
            procesos puedes delegar a la IA hoy mismo.
          </p>
        </div>
      </div>
    </section>
  );
}
