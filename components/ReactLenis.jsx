"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ReactLenis({ root, options, className, children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            ...options,
            ...((typeof root === 'string') ? {
                wrapper: document.querySelector(root),
                content: document.querySelector(root)
            } : {})
        });

        lenisRef.current = lenis;

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const update = (time) => {
            lenis.raf(time * 1000); // Convert to milliseconds
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0); // Disable lag smoothing for smoother scroll

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, [root, options]);

    return <div className={className}>{children}</div>;
}
