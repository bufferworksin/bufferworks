"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Targeted animation for better reliability
            gsap.from(".service-card", {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 85%", // Trigger slightly earlier
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        { title: "Web Applications", desc: "Scalable, high-performance web apps built with modern frameworks.", icon: "💻", gradient: "from-blue-500 to-cyan-500" },
        { title: "CRM Systems", desc: "Custom Customer Relationship Management solutions to streamline business.", icon: "📊", gradient: "from-emerald-500 to-green-500" },
        { title: "Mobile Apps", desc: "Native and cross-platform mobile experiences for iOS and Android.", icon: "📱", gradient: "from-purple-500 to-pink-500" },
        { title: "Machine Learning", desc: "Data-driven models that predict trends and automate decision making.", icon: "🧠", gradient: "from-orange-500 to-red-500" },
        { title: "AI Agents", desc: "Intelligent autonomous agents to handle complex workflows.", icon: "🤖", gradient: "from-indigo-500 to-violet-500" },
        { title: "Video Editing", desc: "Professional post-production and visual storytelling.", icon: "🎬", gradient: "from-rose-500 to-pink-500" },
        { title: "Content Writing", desc: "Compelling narratives and copy that drives engagement.", icon: "✍️", gradient: "from-amber-400 to-orange-500" },
        { title: "UI/UX Design", desc: "User-centric designs that are both functional and beautiful.", icon: "🎨", gradient: "from-teal-400 to-emerald-500" }
    ];

    return (
        <section ref={sectionRef} id="services" className="min-h-screen bg-black text-white py-32 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-20">
                    <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block pb-2">
                        Our Services
                    </h2>
                    <p className="text-zinc-400 mt-6 text-xl max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to elevate your business in the modern era.
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="service-card group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                {s.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                                {s.title}
                            </h3>

                            <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
