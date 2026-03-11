import React from 'react';
import { MagneticButton } from './ui/Button';
import FlowIllustration from './ui/FlowIllustration';

export default function Footer({ onCtaClick }) {
  return (
    <footer className="relative bg-void text-ghost pt-32 pb-12 px-8 overflow-hidden rounded-t-[4rem] border-t border-plasma/20 mt-[-3rem] z-20 shadow-[0_-30px_80px_rgba(10,10,20,1)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(123,97,255,0.07),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-16">
        <div className="max-w-xl">
          <p className="font-mono text-[9px] text-plasma/50 uppercase tracking-[0.4em] mb-6">¿Listo para crecer?</p>
          <h2 className="text-4xl md:text-6xl font-serif italic text-plasma text-glow-plasma mb-8 leading-tight">
            Elimina tus trabas.<br />
            <span className="font-sans font-extrabold not-italic text-ghost tracking-tighter uppercase">Hoy mismo.</span>
          </h2>
          <MagneticButton onClick={onCtaClick} className="px-12 py-4 text-base">
            ¡Quiero eliminar mis trabas ahora!
          </MagneticButton>
        </div>

        <div className="flex flex-col md:items-end gap-12 w-full md:w-1/2">
          <div className="flex items-center gap-3 bg-graphite/60 px-6 py-3 rounded-full border border-ghost/10 self-start md:self-end">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981] shadow-[0_0_10px_#10b981]" />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#10b981] uppercase">
              Sistemas Operativos Activos
            </span>
          </div>

          <FlowIllustration />

          <div className="max-w-[400px] font-sans text-right">
            <h3 className="text-[#f0f0f0] text-sm font-semibold mb-4 leading-relaxed">
              En CeroTraba, somos especialistas en la automatización de procesos con IA para empresas que buscan eliminar la fricción operativa. Diseñamos flujos de trabajo automáticos y agentes de inteligencia artificial que transforman tu infraestructura digital.
            </h3>
            <p className="text-[#a0a0a0] text-xs leading-relaxed">
              Nuestra misión es implementar soluciones tecnológicas de vanguardia y sistemas operativos inteligentes que te permitan procesar más volumen, reducir errores humanos y maximizar tu rentabilidad mediante la transformación digital estratégica.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-28 flex flex-col md:flex-row justify-between items-center text-ghost/20 font-mono text-[10px] tracking-widest pt-8 border-t border-ghost/5 gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="CeroTraba" className="h-6" />
          <span>— Agencia de Automatizaciones IA</span>
        </div>
        <p>© {new Date().getFullYear()} CEROTRABA. TODOS LOS DERECHOS RESERVADOS.</p>
      </div>
    </footer>
  );
}
