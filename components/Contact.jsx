"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-anim", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="contact" className="bg-black text-white py-20 md:py-32 px-6 md:px-12 text-center">
            <h2 className="contact-anim text-4xl md:text-8xl font-bold mb-8">Ready to start?</h2>
            <p className="contact-anim text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                Let's build something extraordinary together. Reach out to us for a consultation.
            </p>
            <a href="mailto:info@bufferworks.in" className="contact-anim inline-block bg-white text-black text-lg font-semibold py-4 px-10 rounded-full hover:scale-105 transition-transform duration-300">
                Get in Touch
            </a>
        </section>
    );
}
