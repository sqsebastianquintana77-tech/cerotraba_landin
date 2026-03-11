import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function LeadForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    empresa: '',
    telefono: '',
    pais: '',
    descripcion: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const webhookUrl = 'https://sannetsolutions-n8n.wz5i51.easypanel.host/webhook/cerotraba';

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.modal-content', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ nombre: '', correo: '', empresa: '', telefono: '', pais: '', descripcion: '' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-void/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="modal-content relative w-full max-w-2xl bg-graphite/90 border border-ghost/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-ghost/40 hover:text-plasma transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        {status === 'success' ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 bg-plasma/20 rounded-full flex items-center justify-center mx-auto text-plasma border border-plasma/30 shadow-[0_0_30px_rgba(123,97,255,0.3)]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h2 className="text-3xl font-sans font-extrabold text-ghost uppercase tracking-tighter">¡Solicitud Enviada!</h2>
            <p className="text-ghost/60 font-sans">Hemos recibido tu información. Un especialista de CeroTraba se pondrá en contacto contigo muy pronto.</p>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] text-plasma/60 uppercase tracking-[0.4em] mb-3">Automatización Estratégica</p>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-ghost uppercase tracking-tighter leading-[0.9]">
                Elimina tus <span className="font-serif italic text-plasma lowercase font-normal text-glow-plasma inline-block">trabas.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <input
                    required
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-ghost/10 rounded-2xl py-3 px-5 text-ghost focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest ml-1">Correo Corporativo</label>
                  <input
                    required
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-ghost/10 rounded-2xl py-3 px-5 text-ghost focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans"
                    placeholder="juan@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest ml-1">Empresa</label>
                  <input
                    required
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-ghost/10 rounded-2xl py-3 px-5 text-ghost focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans"
                    placeholder="Nombre de tu negocio"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest ml-1">Teléfono</label>
                  <input
                    required
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-ghost/10 rounded-2xl py-3 px-5 text-ghost focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans"
                    placeholder="+54 9 11 ..."
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest ml-1">País</label>
                  <input
                    required
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-ghost/10 rounded-2xl py-3 px-5 text-ghost focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans"
                    placeholder="Ej. España, México, Argentina..."
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest ml-1">Procesos a Automatizar</label>
                  <textarea
                    required
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-ghost/10 rounded-2xl py-3 px-5 text-ghost focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans h-32 resize-none"
                    placeholder="Describe los obstáculos que quieres eliminar en tu sector..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-plasma text-ghost font-sans font-extrabold uppercase tracking-tighter py-4 rounded-2xl mt-4 hover:bg-plasma/80 transition-all shadow-[0_0_25px_rgba(123,97,255,0.4)] disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : '¡Quiero eliminar mis trabas ahora!'}
              </button>
              
              {status === 'error' && (
                <p className="text-center text-red-400 text-xs font-sans">Hubo un error al enviar. Por favor intentalo de nuevo.</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
