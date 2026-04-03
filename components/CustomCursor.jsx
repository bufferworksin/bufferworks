"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        // Initial state
        gsap.set(cursorDotRef.current, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorOutlineRef.current, { xPercent: -50, yPercent: -50 });

        const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.1, ease: "power3" });
        const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.1, ease: "power3" });

        const xToOutline = gsap.quickTo(cursorOutlineRef.current, "x", { duration: 0.4, ease: "power3" });
        const yToOutline = gsap.quickTo(cursorOutlineRef.current, "y", { duration: 0.4, ease: "power3" });

        const moveCursor = (e) => {
            xToDot(e.clientX);
            yToDot(e.clientY);
            xToOutline(e.clientX);
            yToOutline(e.clientY);
        };

        const onMouseEnterLink = () => {
            gsap.to(cursorOutlineRef.current, { scale: 1.5,
                backgroundColor: "rgba(255, 255, 255, 1)",
                mixBlendMode: "difference",
                border: "none",
                duration: 0.2 
            });
            gsap.to(cursorDotRef.current, { scale: 0, duration: 0.2 });
        };
        const onMouseLeaveLink = () => {
            gsap.to(cursorOutlineRef.current, { 
                scale: 1, 
                backgroundColor: "transparent",
                mixBlendMode: "normal",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                duration: 0.2 
            });
            gsap.to(cursorDotRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", moveCursor);

        // Add event listeners to all links and buttons for hover effect
        const links = document.querySelectorAll("a, button, [role='button']");
        links.forEach((link) => {
            link.addEventListener("mouseenter", onMouseEnterLink);
            link.addEventListener("mouseleave", onMouseLeaveLink);
        });

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            links.forEach((link) => {
                link.removeEventListener("mouseenter", onMouseEnterLink);
                link.removeEventListener("mouseleave", onMouseLeaveLink);
            });
        };
    }, []);

    // Return nothing on smaller screens to avoid blocking touch
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
            />
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998]"
            />
        </>
    );
}
