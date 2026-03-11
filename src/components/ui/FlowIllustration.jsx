import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FlowIllustration() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate chaos nodes (slight floating)
      gsap.to('.chaos-node', {
        x: 'random(-5, 5)',
        y: 'random(-5, 5)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Animate flow lines (pulse)
      gsap.to('.flow-line', {
        strokeDashoffset: 0,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        ease: 'none',
        stagger: 0.5
      });

      // Simple reveal for ordered nodes
      gsap.from('.order-node', {
        opacity: 0.2,
        scale: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-32 md:h-40 opacity-40 select-none pointer-events-none" ref={svgRef}>
      <svg
        viewBox="0 0 400 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Chaos side */}
        <circle className="chaos-node" cx="40" cy="30" r="3" fill="#7B61FF" fillOpacity="0.6" />
        <circle className="chaos-node" cx="25" cy="55" r="4" fill="#7B61FF" fillOpacity="0.4" />
        <circle className="chaos-node" cx="45" cy="85" r="2.5" fill="#7B61FF" fillOpacity="0.5" />
        <circle className="chaos-node" cx="65" cy="45" r="3.5" fill="#7B61FF" fillOpacity="0.3" />
        
        {/* Connection messy lines */}
        <path d="M40 30 L65 45" stroke="#7B61FF" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M25 55 L45 85" stroke="#7B61FF" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M65 45 L45 85" stroke="#7B61FF" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Transitional Flow Lines */}
        <path
          className="flow-line"
          d="M80 60 C 150 60, 200 40, 300 40"
          stroke="url(#flowGradient)"
          strokeWidth="1.5"
          strokeDasharray="10 200"
          strokeDashoffset="210"
        />
        <path
          className="flow-line"
          d="M80 60 C 150 60, 200 80, 300 80"
          stroke="url(#flowGradient)"
          strokeWidth="1.5"
          strokeDasharray="10 200"
          strokeDashoffset="210"
        />
        <path
          className="flow-line"
          d="M80 60 L 300 60"
          stroke="url(#flowGradient)"
          strokeWidth="1"
          strokeDasharray="10 200"
          strokeDashoffset="210"
        />

        {/* Ordered side */}
        <circle className="order-node" cx="320" cy="40" r="4" fill="#7B61FF" />
        <circle className="order-node" cx="350" cy="40" r="4" fill="#7B61FF" />
        <circle className="order-node" cx="320" cy="60" r="4" fill="#7B61FF" />
        <circle className="order-node" cx="350" cy="60" r="4" fill="#7B61FF" />
        <circle className="order-node" cx="320" cy="80" r="4" fill="#7B61FF" />
        <circle className="order-node" cx="350" cy="80" r="4" fill="#7B61FF" />
        
        {/* Clean connections */}
        <line x1="320" y1="40" x2="350" y2="40" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="320" y1="60" x2="350" y2="60" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="320" y1="80" x2="350" y2="80" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="320" y1="40" x2="320" y2="80" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="350" y1="40" x2="350" y2="80" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.3" />

        <defs>
          <linearGradient id="flowGradient" x1="80" y1="60" x2="300" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7B61FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#7B61FF" />
            <stop offset="1" stopColor="#F0F0F0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
