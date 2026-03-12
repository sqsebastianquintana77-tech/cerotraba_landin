import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROTOCOLS = [
  { img: '/diagnostico_1.1.jpg', alt: 'Diagnóstico' },
  { img: '/diseño_2.2.jpg', alt: 'Diseño' },
  { img: '/integracion_3.3.jpg', alt: 'Integración' },
];

export default function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        const isLastCard = i === cards.length - 1;
        
        // Creamos un timeline para controlar la entrada y la salida de la tarjeta
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: `top ${40 + i * 3}%`, // Starts much lower to separate from title
            end: `+=${window.innerHeight * 1.5}`, // Extend the scroll area so we have time to fade out
            scrub: 1, // Smooth fluid effect
            pin: true,
            pinSpacing: false,
          }
        });

        // 1. La tarjeta se apila (toma el primer 70% del scroll asignado a esta tarjeta)
        tl.to(card, {
          scale: isLastCard ? 1 : 0.9,
          // Cambiado a 0: Si no es la última tarjeta, se desvanece por completo antes 
          // de que la siguiente se posicione encima. Si es la última, se queda visible.
          opacity: isLastCard ? 1 : 0, 
          transformOrigin: 'top center',
          ease: 'power2.inOut',
          duration: 0.7 
        });

        // 2. Desaparece más rápido (toma el último 30% del scroll)
        tl.to(card, {
          opacity: 0,
          scale: 0.8,
          ease: 'power1.in',
          duration: 0.3
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative py-20 bg-void">
      <div className="sticky top-20 md:top-24 text-center mb-12 md:mb-16 z-20 px-6 md:px-8 bg-void/80 backdrop-blur-sm py-4 rounded-3xl mx-auto max-w-2xl">
        <p className="font-mono text-[9px] text-plasma/50 uppercase tracking-[0.4em] mb-3 md:mb-4">El proceso</p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold text-ghost tracking-tighter uppercase leading-[0.9] lg:leading-[0.88]">
          Nuestro{' '}
          <span className="font-serif italic text-plasma font-normal text-glow-plasma text-4xl md:text-5xl lg:text-7xl">protocolo.</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 pb-20 md:pb-32 z-10 mt-24 md:mt-[15vh]">
        {PROTOCOLS.map((proto, index) => (
          <div
            key={index}
            className="protocol-card mb-[35vh] md:mb-[42vh] w-full rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden ring-1 ring-ghost/10"
          >
            <img src={proto.img} alt={proto.alt} className="w-full h-auto block" />
          </div>
        ))}
      </div>
    </section>
  );
}
