import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MessageCircle, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function TimeRecoveryUI() {
  const [hours, setHours]   = useState(10);
  const [active, setActive] = useState(0);
  const tasks = [
    'Estrategia de crecimiento',
    'Captación de clientes',
    'Proyectos de alto impacto',
    'Escalabilidad del negocio',
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      setHours(h => h + Math.floor(Math.random() * 5) + 1);
      setActive(a => (a + 1) % tasks.length);
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="mt-8 bg-void/80 rounded-[2rem] border border-plasma/20 p-6 h-44 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(123,97,255,0.08),transparent)]" />
      <div className="relative z-10">
        <p className="font-mono text-[9px] text-plasma/50 uppercase tracking-widest mb-1">Horas recuperadas / semana</p>
        <p className="font-sans font-black text-4xl text-plasma text-glow-plasma tabular-nums">+{hours}h</p>
      </div>
      <div className="relative z-10 bg-graphite/60 rounded-2xl px-4 py-2 border border-plasma/10 transition-all duration-500">
        <p className="font-mono text-[10px] text-ghost/60 truncate">
          {'>'} Invertidas en: <span className="text-plasma">{tasks[active]}</span>
        </p>
      </div>
    </div>
  );
}

function ResponseTelemetryUI() {
  const lines = [
    '> CLIENTE escribe a las 23:47...',
    '> IA_AGENTE detecta intención...',
    '> RESPUESTA generada en 0.3s ✓',
    '> VENTA calificada y registrada.',
    '> AWAITING_NEXT_MSG_',
  ];
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(v => (v < lines.length ? v + 1 : 1));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="mt-8 bg-void/80 rounded-[2rem] border border-plasma/20 p-6 h-44 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(123,97,255,0.06),transparent)]" />
      <div className="relative z-10 font-mono text-[9px] text-ghost/60 flex flex-col gap-1.5">
        {lines.slice(0, visible).map((l, i) => (
          <p key={i} className={i === visible - 1 ? 'text-plasma' : 'text-ghost/40'}>
            {l}
            {i === visible - 1 && (
              <span className="biolum-dot inline-block w-1.5 h-3 bg-plasma ml-1 align-middle" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

function ScaleProtocolUI() {
  const nodes = [
    { label: 'Proceso actual', state: 'overflow' },
    { label: 'IA interviene',  state: 'active'   },
    { label: '2× ventas',      state: 'stable'   },
    { label: 'Sin contratar +5', state: 'stable' },
  ];
  return (
    <div className="mt-8 bg-void/80 rounded-[2rem] border border-plasma/20 p-6 h-44 relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(123,97,255,0.06),transparent)]" />
      <div className="relative z-10 flex items-center gap-0 w-full">
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`relative w-3 h-3 rounded-full border-2 ${
                  n.state === 'overflow'
                    ? 'bg-red-500/80 border-red-400 shadow-[0_0_10px_#ef4444]'
                    : n.state === 'active'
                    ? 'bg-plasma border-plasma biolum-dot'
                    : 'bg-green-500/80 border-green-400 shadow-[0_0_8px_#10b981]'
                }`}
              >
                {n.state === 'overflow' && (
                  <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />
                )}
              </div>
              <p className="font-mono text-[8px] text-ghost/50 mt-2 text-center leading-tight max-w-[60px]">
                {n.label}
              </p>
            </div>
            {i < nodes.length - 1 && (
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 via-plasma/50 to-green-500/50 mb-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const CARDS = [
  {
    icon: Clock,
    label: '01 / Tiempo',
    question: 'Si mañana pudieras recuperar 10 horas de tu semana eliminando tareas repetitivas, ¿en qué proyecto estratégico las invertirías para duplicar tus ingresos?',
    microUI: <TimeRecoveryUI />,
  },
  {
    icon: MessageCircle,
    label: '02 / Ventas',
    question: '¿Cuántas ventas estás dejando sobre la mesa hoy porque un cliente escribió un domingo o fuera de horario y nadie le respondió en menos de 5 minutos?',
    microUI: <ResponseTelemetryUI />,
  },
  {
    icon: Zap,
    label: '03 / Escalabilidad',
    question: '¿Cuál es ese proceso en tu empresa que, si hoy duplicaras tus ventas, colapsaría de inmediato o te obligaría a contratar a 5 personas más?',
    microUI: <ScaleProtocolUI />,
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 120, opacity: 0, duration: 1.6, stagger: 0.15, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 px-6 md:px-8 min-h-screen bg-void flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 gap-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold text-ghost tracking-tighter uppercase leading-[0.9] lg:leading-[0.88]">
            Las tres preguntas<br />
            <span className="font-serif italic text-plasma font-normal text-glow-plasma text-4xl md:text-5xl lg:text-7xl">que lo cambian todo.</span>
          </h2>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-plasma/60 max-w-[280px] lg:text-right leading-relaxed">
            Si alguna te genera incomodidad, ya encontraste tu primera traba.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="feature-card group relative bg-graphite/40 hover:bg-graphite/70 transition-colors duration-500 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border border-ghost/5 hover:border-plasma/30 flex flex-col min-h-[500px] md:h-[560px] overflow-hidden"
              >
                <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(123,97,255,0.12),transparent)]" />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-void border border-plasma/30 flex items-center justify-center mb-6 md:mb-8 group-hover:border-plasma/70 transition-all duration-500 relative z-10">
                  <Icon className="text-plasma/70 group-hover:text-plasma transition-colors" size={18} md:size={20} strokeWidth={1.5} />
                </div>
                <p className="font-mono text-[9px] text-plasma/50 uppercase tracking-[0.35em] mb-4 relative z-10">{card.label}</p>
                <h3 className="text-lg md:text-xl font-serif italic text-ghost leading-snug relative z-10 flex-1 mb-6">{card.question}</h3>
                <div className="relative z-10">{card.microUI}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
