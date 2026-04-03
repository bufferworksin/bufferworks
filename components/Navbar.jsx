"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import Magnetic from "./Magnetic";

export default function Navbar() {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);

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

    // Desktop Interaction animation (Mobile Expansion is moved to separate overlay)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop Animation
            mm.add("(min-width: 768px)", () => {
                if (isHovered) {
                    gsap.to(navRef.current, {
                        width: 650,
                        height: 64,
                        borderRadius: "2rem",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.75)"
                    });
                    gsap.to(".nav-expanded", {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        delay: 0.1,
                        display: "flex"
                    });
                    gsap.to(".nav-compact", {
                        opacity: 0,
                        duration: 0.2,
                        display: "none"
                    });
                } else {
                    gsap.to(navRef.current, {
                        width: 200,
                        height: 48,
                        borderRadius: "0 0 2rem 2rem",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.75)"
                    });
                    gsap.to(".nav-expanded", {
                        opacity: 0,
                        x: 20,
                        duration: 0.2,
                        display: "none"
                    });
                    gsap.to(".nav-compact", {
                        opacity: 1,
                        duration: 0.3,
                        delay: 0.1,
                        display: "flex"
                    });
                }
            });

            // On mobile, the main pill stays small, but its hamburger transforms.
            mm.add("(max-width: 767px)", () => {
                gsap.to(navRef.current, {
                    width: 200,
                    height: 48,
                    borderRadius: "0 0 2rem 2rem",
                    duration: 0.5,
                    ease: "power3.out"
                });
            });
        }, navRef);
        return () => ctx.revert();
    }, [isHovered]);

    // Fullscreen Mobile Overlay Animation
    useEffect(() => {
        if (window.innerWidth >= 768) return; // Ignore on desktop

        const links = mobileMenuRef.current.querySelectorAll('.mobile-link');
        
        if (isMobileMenuOpen) {
            // Block scrolling
            document.body.style.overflow = 'hidden';
            gsap.to(mobileMenuRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power2.out" });
            gsap.fromTo(links, 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.1 }
            );
        } else {
            // Restore scrolling
            document.body.style.overflow = 'auto';
            gsap.to(links, { y: 20, opacity: 0, duration: 0.3, stagger: -0.05, ease: "power2.in" });
            gsap.to(mobileMenuRef.current, { opacity: 0, pointerEvents: "none", duration: 0.4, delay: 0.2, ease: "power2.in" });
        }
    }, [isMobileMenuOpen]);

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Top Navigation Pill */}
            <div className="fixed top-0 w-full flex justify-center z-[60] pointer-events-none">
                <nav
                    ref={navRef}
                    onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
                    onMouseLeave={() => window.innerWidth >= 768 && setIsHovered(false)}
                    className="bg-black pointer-events-auto border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
                               rounded-b-[2rem] overflow-hidden flex flex-col items-center relative cursor-pointer md:cursor-default"
                    style={{ width: 200, height: 48 }}
                >
                    {/* Compact Content */}
                    <div className="nav-compact absolute inset-0 flex items-center justify-center w-full h-[48px] z-20">
                        <span className="text-white font-bold tracking-[0.2em] text-xs whitespace-nowrap">BUFFERWORKS</span>

                        {/* Mobile Hamburger toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white w-6 h-6 flex flex-col justify-center items-end gap-1 px-1 absolute right-3"
                        >
                            <span className={`block w-4 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px] w-5' : ''}`}></span>
                            <span className={`block w-2.5 h-0.5 bg-zinc-400 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-4 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px] w-5' : ''}`}></span>
                        </button>
                    </div>

                    {/* Expanded Content (Desktop Hover State) */}
                    <div className="nav-expanded hidden w-full h-full items-center justify-between px-8 z-20 opacity-0 bg-zinc-950/90 backdrop-blur-md">
                        <Link href="/" className="text-white font-bold tracking-[0.2em] text-sm hover:opacity-80 transition-opacity">
                            BUFFERWORKS
                        </Link>

                        <div className="flex gap-8 absolute left-1/2 -translate-x-1/2">
                            <Magnetic><Link href="#work" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors block p-2">Work</Link></Magnetic>
                            <Magnetic><Link href="#services" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors block p-2">Services</Link></Magnetic>
                            <Magnetic><Link href="#about" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors block p-2">About</Link></Magnetic>
                        </div>

                        <Link href="#contact" className="bg-white text-black text-[10px] font-bold px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors">
                            GET STARTED
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Fullscreen Mobile Glass Overlay */}
            <div 
                ref={mobileMenuRef}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-none opacity-0 md:hidden"
            >
                <div className="flex flex-col items-center gap-10 mt-12 w-full px-6">
                    <Link href="#work" onClick={handleMobileLinkClick} className="mobile-link text-4xl font-bold tracking-tight text-white hover:text-zinc-400 transition-colors">Work</Link>
                    <Link href="#services" onClick={handleMobileLinkClick} className="mobile-link text-4xl font-bold tracking-tight text-white hover:text-zinc-400 transition-colors">Services</Link>
                    <Link href="#about" onClick={handleMobileLinkClick} className="mobile-link text-4xl font-bold tracking-tight text-white hover:text-zinc-400 transition-colors">About</Link>
                    
                    <Link href="#contact" onClick={handleMobileLinkClick} className="mobile-link mt-8 bg-white text-black text-sm font-bold tracking-widest uppercase px-12 py-4 rounded-full border border-white/20 hover:scale-105 transition-transform">
                        Start Project
                    </Link>
                </div>
            </div>
        </>
    );
}
