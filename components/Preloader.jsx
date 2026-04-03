"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
    const loaderRef = useRef(null);
    const counterRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Count up animation
            tl.to(counterRef.current, {
                innerText: 100,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power2.inOut",
            })
            // Reveal text
            .to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=1.0")
            // Slide up loader
            .to(loaderRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.2
            });
            
        }, loaderRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center overflow-hidden">
                <div 
                    ref={textRef} 
                    className="text-white font-bold tracking-[0.3em] text-sm md:text-xl opacity-0 translate-y-8"
                >
                    BUFFERWORKS
                </div>
                <div className="mt-6 flex flex-row items-end">
                    <div ref={counterRef} className="text-white text-4xl md:text-6xl font-mono font-medium">
                        0
                    </div>
                    <span className="text-white text-xl md:text-2xl font-mono mb-1 md:mb-2 ml-1">%</span>
                </div>
            </div>
        </div>
    );
}
