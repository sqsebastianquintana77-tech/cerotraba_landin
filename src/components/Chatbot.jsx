import React, { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte con tus automatizaciones hoy?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Un identificador de sesión único sencillo para que n8n mantenga el contexto de la memoria
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 11));
  const messagesEndRef = useRef(null);

  const webhookUrl = 'https://sannetsolutions-n8n.wz5i51.easypanel.host/webhook/96e6b284-e1e1-47b7-bb3b-2dea3c95ad20/chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: userMessage.text, sessionId }),
      });

      const data = await response.json();
      
      // Intentamos extraer la respuesta de los formatos más comunes de n8n
      const botReply = data.output || data.response || data.text || (typeof data === 'string' ? data : 'Recibí tu mensaje.');

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error enviando mensaje al chatbot:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Lo siento, hubo un error al conectar con el servidor. Por favor, intenta de nuevo.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-void/90 backdrop-blur-xl border border-ghost/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-graphite/80 p-4 border-b border-ghost/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-plasma/20 flex items-center justify-center text-plasma border border-plasma/30 shadow-[0_0_10px_rgba(123,97,255,0.3)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-ghost font-bold text-sm tracking-wide">Asistente IA</h3>
                <p className="text-[10px] text-plasma/70 font-mono uppercase tracking-wider">CeroTraba</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ghost/50 hover:text-ghost transition-colors p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-plasma/20 border border-plasma/30 text-ghost shadow-[0_0_15px_rgba(123,97,255,0.15)] rounded-br-sm'
                      : 'bg-graphite/60 border border-ghost/10 text-ghost/90 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[9px] text-ghost/30 mt-1 px-1 font-mono uppercase">
                  {msg.sender === 'user' ? 'Tú' : 'IA'}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto flex max-w-[85%]">
                <div className="p-4 rounded-2xl bg-graphite/60 border border-ghost/10 rounded-bl-sm flex gap-1.5 items-center h-[46px]">
                  <span className="w-1.5 h-1.5 bg-plasma/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-plasma/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-plasma/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-graphite/80 border-t border-ghost/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="w-full bg-void/50 border border-ghost/10 rounded-xl py-3 pl-4 pr-12 text-sm text-ghost placeholder-ghost/30 focus:outline-none focus:border-plasma/50 focus:ring-1 focus:ring-plasma/50 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 text-plasma hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-plasma"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.4)] hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] ${
          isOpen ? 'bg-graphite text-ghost rotate-90 scale-90' : 'bg-plasma text-white hover:scale-105'
        }`}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
