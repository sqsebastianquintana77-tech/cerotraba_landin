import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // quickTo is highly optimized for mouse tracking
        const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

        const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            dotX(clientX);
            dotY(clientY);
            ringX(clientX);
            ringY(clientY);
        };

        const handleMouseOver = (e) => {
            const tag = e.target.tagName.toLowerCase();
            const isClickable = ['a', 'button'].includes(tag) || e.target.closest('button') || e.target.closest('a');
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        // Initial setting so it doesn't stay at top left awkwardly
        gsap.set([dot, ring], { x: window.innerWidth / 2, y: window.innerHeight / 2 });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div className="hidden lg:block pointer-events-none">
            {/* Small dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-plasma rounded-full pointer-events-none z-[10000] -ml-1 -mt-1 mix-blend-screen shadow-[0_0_10px_#7B61FF]"
            />

            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 w-8 h-8 border border-plasma/50 rounded-full pointer-events-none z-[9999] -ml-4 -mt-4 transition-transform duration-300 ease-out flex items-center justify-center mix-blend-screen shadow-[0_0_15px_rgba(123,97,255,0.2)]
          ${isHovering ? 'scale-[2.5] bg-plasma/10 border-plasma' : 'scale-100'}`}
            />
        </div>
    );
}
