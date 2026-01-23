"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);

    // Initial load animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.5
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    // Interaction animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop Animation
            mm.add("(min-width: 768px)", () => {
                if (isHovered) {
                    // Expand
                    gsap.to(navRef.current, {
                        width: 650,
                        height: 64,
                        borderRadius: "2rem",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.75)"
                    });

                    // Show Expanded Content
                    gsap.to(".nav-expanded", {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        delay: 0.1,
                        display: "flex"
                    });

                    // Hide Compact Content
                    gsap.to(".nav-compact", {
                        opacity: 0,
                        duration: 0.2,
                        display: "none"
                    });
                } else {
                    // Contract
                    gsap.to(navRef.current, {
                        width: 160,
                        height: 48,
                        borderRadius: "0 0 2rem 2rem",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.75)"
                    });

                    // Hide Expanded Content
                    gsap.to(".nav-expanded", {
                        opacity: 0,
                        x: 20,
                        duration: 0.2,
                        display: "none"
                    });

                    // Show Compact Content
                    gsap.to(".nav-compact", {
                        opacity: 1,
                        duration: 0.3,
                        delay: 0.1,
                        display: "flex"
                    });
                }
            });

            // Mobile Animation
            mm.add("(max-width: 767px)", () => {
                if (isMobileMenuOpen) {
                    // Expand Full
                    gsap.to(navRef.current, {
                        width: "90%",
                        height: "auto",
                        borderRadius: "2rem",
                        duration: 0.5,
                        ease: "power3.out"
                    });
                    gsap.to(".nav-mobile-menu", {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: 0.2,
                        display: "flex"
                    });
                    gsap.to(".nav-compact", {
                        opacity: 1, // Keep compact visible to show close button if we change icon
                    });
                } else {
                    // Contract
                    gsap.to(navRef.current, {
                        width: 160,
                        height: 48,
                        borderRadius: "0 0 2rem 2rem",
                        duration: 0.5,
                        ease: "power3.out"
                    });
                    gsap.to(".nav-mobile-menu", {
                        opacity: 0,
                        y: -20,
                        duration: 0.2,
                        display: "none"
                    });
                }
            });
        }, navRef);
        return () => ctx.revert();
    }, [isHovered, isMobileMenuOpen]);

    return (
        <div className="fixed top-0 w-full flex justify-center z-50 pointer-events-none">
            <nav
                ref={navRef}
                onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
                onMouseLeave={() => window.innerWidth >= 768 && setIsHovered(false)}
                onClick={() => {
                    // Toggle menu on mobile click (if not already handled by child elements)
                    if (window.innerWidth < 768) {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                    }
                }}
                className="bg-black pointer-events-auto border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
                           rounded-b-[2rem] overflow-hidden flex flex-col items-center relative cursor-pointer md:cursor-default"
                style={{ width: 160, height: 48 }}
            >
                {/* Compact Content (Default State) */}
                <div className="nav-compact absolute inset-0 flex items-center justify-center gap-3 w-full h-[48px] z-20">
                    <span className="text-white font-bold tracking-[0.2em] text-xs whitespace-nowrap">BUFFERWORKS</span>

                    {/* Mobile Hamburger (Visible only on mobile) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white w-6 h-6 flex flex-col justify-center items-end gap-1"
                    >
                        <span className={`block w-5 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-3 h-0.5 bg-zinc-400 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-5 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Expanded Content (Desktop Hover State) */}
                <div className="nav-expanded hidden w-full h-full items-center justify-between px-8 z-20 opacity-0">
                    <Link href="/" className="text-white font-bold tracking-[0.2em] text-sm hover:opacity-80 transition-opacity">
                        BUFFERWORKS
                    </Link>

                    <div className="flex gap-8 absolute left-1/2 -translate-x-1/2">
                        <Link href="#work" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Work</Link>
                        <Link href="#services" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Services</Link>
                        <Link href="#about" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">About</Link>
                    </div>

                    <Link href="#contact" className="bg-white text-black text-[10px] font-bold px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors">
                        GET STARTED
                    </Link>
                </div>

                {/* Mobile Menu Content (Expanded State) */}
                <div className="nav-mobile-menu hidden w-full flex-col items-center gap-6 pb-6 pt-16 z-10 opacity-0">
                    <Link href="#work" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xl font-medium">Work</Link>
                    <Link href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xl font-medium">Services</Link>
                    <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xl font-medium">About</Link>
                    <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-black text-xs font-bold px-8 py-3 rounded-full mt-4">
                        START PROJECT
                    </Link>
                </div>
            </nav>
        </div>
    );
}
