import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philo-text', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 68%' },
        y: 70, opacity: 0, stagger: 0.22, duration: 1.6, ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative py-40 px-8 min-h-[80vh] bg-void text-ghost flex items-center justify-center overflow-hidden"
    >
      {/* Background matching Vapor Clinic aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(123,97,255,0.08),transparent)] pointer-events-none" />
      <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-plasma/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-plasma/5 blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <div className="philo-text">
          <p className="font-mono text-[9px] text-plasma/70 uppercase tracking-[0.4em] mb-10">Nuestro diferencial</p>
          <div className="space-y-10 text-ghost">
            <h3 className="font-serif italic text-5xl md:text-7xl text-plasma leading-tight text-glow-plasma">
              Flujos impecables.
            </h3>
            <div className="text-xl md:text-2xl leading-relaxed font-serif text-ghost/90 space-y-8 max-w-3xl mx-auto">
              <p>
                Eliminamos los cuellos de botella con IA estratégica para transformar procesos lentos en flujos de trabajo impecables y con CeroTraba.
              </p>
              <p>
                Hacemos que la tecnología trabaje para ti, simplificando tu atención al cliente y tus tareas diarias con soluciones <span className="font-sans font-bold text-plasma">inteligentes que eliminan cualquier obstáculo.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
