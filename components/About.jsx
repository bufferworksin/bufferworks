"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-black text-white py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <h2 ref={textRef} className="text-3xl md:text-6xl font-bold leading-tight">
                    We craft digital <span className="text-zinc-500">experiences</span> that define the future.
                </h2>
            </div>
            <div className="md:w-1/2">
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg">
                    Bufferworks is a next-generation tech agency. We blend cutting-edge technology with high-end design to build software that not only works flawlessly but looks stunning. From web apps to immersive 3D experiences, we push the boundaries of what's possible on the web.
                </p>
            </div>
        </section>
    );
}
