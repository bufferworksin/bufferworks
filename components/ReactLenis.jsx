"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function ReactLenis({ root, options, className, children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            ...options,
            wrapper: root ? document.querySelector(root) : window,
            content: root ? document.querySelector(root) : document.body,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [root, options]);

    return <div className={className}>{children}</div>;
}
