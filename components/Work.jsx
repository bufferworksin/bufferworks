"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Work() {
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);

    // Simulated Database Data
    const projects = [
        {
            id: 1,
            title: "KwikStays",
            description: "Hotel Booking Platform",
            type: "web", // Changed to mobile based on "screenshot" comment, user can verify
            image: "/kwikstays.png",
            tags: ["Hotel", "Booking", "Platform"],
            year: "2026"
        },
        {
            id: 2,
            title: "Goa Tour Wala",
            description: "Tourism Booking Platform",
            type: "web",
            image: "/goatourwala.png",
            tags: ["Tourism", "Booking", "Platform"],
            year: "2025"
        },
        {
            id: 3,
            title: "IDT",
            description: "IDT is online event management platform",
            type: "mobile",
            image: "/idt.jpeg",
            tags: ["Event", "Management", "Platform"],
            year: "2026"
        },
        {
            id: 4,
            title: "Poddar Jewellers",
            description: "Poddar Jewellers is an online jewellery store",
            type: "mobile",
            image: "/poddarjewellar.jpeg",
            tags: ["Jewellery", "Store", "Platform"],
            year: "2024"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.1, // Stagger effect
                    ease: "power3.out",
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} id="work" className="bg-zinc-950 text-white py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-600">
                        Selected Work
                    </h2>
                    <p className="text-zinc-400 mt-4 md:mt-0 max-w-sm text-right hidden md:block">
                        A showcase of our most ambitious projects, pushing the boundaries of design and code.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-center">
                    {projects.map((p, i) => {
                        const isMobile = p.type === 'mobile';
                        // Alternate direction for mobile projects based on their index in the array
                        const isEven = i % 2 === 0;

                        return (
                            <div
                                key={p.id}
                                ref={addToRefs}
                                className={`group cursor-pointer w-full ${isMobile ? 'md:col-span-2 flex flex-col md:flex-row gap-12 justify-center items-center' : 'md:col-span-1'} ${isMobile && !isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Image Container */}
                                <div
                                    className={`relative rounded-2xl overflow-hidden mb-6 md:mb-0 transition-all duration-500
                                    ${isMobile ? 'w-full md:w-1/4 aspect-[9/16] shadow-2xl' : 'w-full aspect-[4/3]'}
                                    `}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10 z-20">
                                        {p.year}
                                    </div>
                                    <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 z-20">
                                        {p.type}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`space-y-4 ${isMobile ? 'w-full md:w-1/2 md:px-8' : ''}`}>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {p.tags.map((tag, i) => (
                                            <span key={i} className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className={`font-bold group-hover:text-zinc-300 transition-colors ${isMobile ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                                        {p.title}
                                    </h3>
                                    <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                                        {p.description}
                                    </p>

                                    {/* Mobile specific call to action or link styling could go here */}
                                    {isMobile && (
                                        <div className="pt-4">
                                            <span className="inline-block text-white border-b border-white pb-1 text-sm tracking-widest uppercase group-hover:border-zinc-500 transition-colors">View Case Study</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
