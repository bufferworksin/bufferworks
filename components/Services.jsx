"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Monitor, PieChart, Smartphone, TrendingUp, Bot, Clapperboard, PenTool, LayoutTemplate } from 'lucide-react';

const services = [
    { title: "Web Applications", desc: "Scalable, high-performance web apps built with modern frameworks and robust logic.", icon: <Monitor className="w-8 h-8 text-white" />, image: "/services/web_apps_bg_1775221540574.png", year: "01" },
    { title: "CRM Systems", desc: "Custom Customer Relationship Management solutions to streamline business operations.", icon: <PieChart className="w-8 h-8 text-white" />, image: "/services/crm_systems_bg_1775221573374.png", year: "02" },
    { title: "Mobile Apps", desc: "Native and cross-platform mobile experiences crafted for iOS and Android.", icon: <Smartphone className="w-8 h-8 text-white" />, image: "/services/mobile_apps_bg_1775221621782.png", year: "03" },
    { title: "Digital Marketing", desc: "Strategic online campaigns to increase brand visibility and drive massive conversions.", icon: <TrendingUp className="w-8 h-8 text-white" />, image: "/services/digital_marketing_bg_1775221641915.png", year: "04" },
    { title: "AI Agents", desc: "Intelligent autonomous agents engineered to handle complex, repetitive workflows.", icon: <Bot className="w-8 h-8 text-white" />, image: "/services/ai_agents_bg_1775221710971.png", year: "05" },
    { title: "Video Editing", desc: "Professional post-production and visual storytelling that captivates audiences.", icon: <Clapperboard className="w-8 h-8 text-white" />, image: "/services/video_editing_bg_1775221762520.png", year: "06" },
    { title: "Content Writing", desc: "Compelling narratives and SEO-driven copy that drives engagement and trust.", icon: <PenTool className="w-8 h-8 text-white" />, image: "/services/digital_marketing_bg_1775221641915.png", year: "07" }, 
    { title: "UI/UX Design", desc: "User-centric interactive interfaces that are exceptionally functional and beautiful.", icon: <LayoutTemplate className="w-8 h-8 text-white" />, image: "/services/web_apps_bg_1775221540574.png", year: "08" } 
];

function ServiceCard({ s }) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative w-[85vw] md:w-[450px] shrink-0 h-[450px] md:h-[500px] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 transition-transform duration-700 ease-out shadow-2xl"
        >
            {/* Inner Image Background */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
                 <div className="service-bg absolute inset-0 w-[120%] h-full left-[-10%] scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out">
                    <Image 
                        src={s.image} 
                        alt={s.title} 
                        fill 
                        className="object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700 ease-out saturate-50 group-hover:saturate-100"
                    />
                 </div>
                 {/* Dark Guard Overlay for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity mix-blend-multiply" />
            </div>

            {/* Spotlight Interactive Layer */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 mix-blend-overlay"
                style={{
                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 50%)`
                }}
            />

            {/* Content Layer */}
            <div className="relative z-20 flex flex-col h-full justify-between p-8 md:p-10 pointer-events-none">
                <div>
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-500">
                            {s.icon}
                        </div>
                        <span className="text-zinc-400 font-mono text-xl font-bold tracking-widest drop-shadow-lg">
                            {s.year}
                        </span>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-amber-100 transition-colors duration-300 drop-shadow-md">
                        {s.title}
                    </h3>

                    <p className="text-zinc-300/80 text-lg leading-relaxed group-hover:text-white transition-colors duration-300 max-w-sm drop-shadow-sm font-medium">
                        {s.desc}
                    </p>
                </div>

                <div className="pt-8 border-t border-white/10 group-hover:border-white/30 transition-colors">
                    <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors duration-300">
                        Explore <span className="text-xl leading-none group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Services() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop: Horizontal Scroll
            mm.add("(min-width: 768px)", () => {
                const track = trackRef.current;
                const totalScroll = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);

                // Horizontal Translation
                gsap.to(track, {
                    x: () => -totalScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${totalScroll}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Title Fades out
                gsap.to(".services-title-wrapper", {
                    y: -100,
                    opacity: 0,
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=500",
                        scrub: true,
                    }
                });

                // Inner Image Parallax (The magic depth effect)
                gsap.utils.toArray(".service-bg").forEach((bg) => {
                    gsap.to(bg, {
                        x: "15%", // Pans to the right as card moves to the left
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: () => `+=${totalScroll}`,
                            scrub: 1,
                        }
                    });
                });
            });

            // Mobile logic: Horizontal Deal Stack
            mm.add("(max-width: 767px)", () => {
                const cards = gsap.utils.toArray(".mobile-service-anim");

                // Set initial states for overlapping layout
                gsap.set(cards[0], { x: "0%", scale: 1, opacity: 1 });
                cards.slice(1).forEach((card) => {
                    gsap.set(card, { x: "90%", scale: 1, opacity: 1 }); // Peeking from the right
                });

                // Master Timeline Pinned
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 4}`, // 4 screens of scrolling for smooth pacing
                        pin: true,
                        scrub: 1,
                    }
                });

                // Title Fades out immediately
                tl.to(".services-title-wrapper", {
                    y: -50,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in"
                }, 0);

                // Iterate overlaps
                cards.forEach((card, index) => {
                    if (index === 0) return; // First card is already static
                    
                    const label = `stagger${index}`;

                    // Current card slides in over previous
                    tl.to(card, {
                        x: "0%", 
                        duration: 1,
                        ease: "power2.inOut"
                    }, label);

                    // Optional: previous card slightly shrinks and dims beneath it
                    tl.to(cards[index - 1], {
                        scale: 0.95,
                        opacity: 0.5,
                        duration: 1,
                        ease: "power2.inOut"
                    }, label);
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="bg-black relative text-white overflow-hidden">
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-pink-900/20 blur-[150px] opacity-70 pointer-events-none mix-blend-screen" />
            
            <div ref={containerRef} className="min-h-[100svh] relative flex flex-col justify-center py-20 md:py-16">
                
                <div className="services-title-wrapper w-full px-6 md:px-[10vw] mb-12 md:mb-16 md:shrink-0 z-20">
                    <h2 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block pb-2 -ml-1">
                        Our Services
                    </h2>
                    <p className="text-zinc-400 mt-4 md:mt-6 text-xl md:text-2xl max-w-2xl">
                        Comprehensive digital solutions engineered to elevate your business in the modern era.
                    </p>
                </div>

                <div className="w-full flex items-center z-10 relative">
                    <div 
                        ref={trackRef} 
                        className="flex flex-col md:flex-row gap-0 md:gap-16 px-0 md:px-[10vw] pb-8 md:pb-0 w-full md:w-max relative"
                    >
                        {services.map((s, i) => (
                            <div 
                                key={i} 
                                className={`mobile-service-anim flex justify-center origin-center w-full md:w-auto shadow-2xl ${
                                    i === 0 ? 'relative' : 'absolute md:relative top-0 md:top-auto left-0 md:left-auto md:w-auto'
                                }`}
                                style={{ zIndex: i + 10 }}
                            >
                                <ServiceCard s={s} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
