"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function Contact() {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const successRef = useRef(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
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

    useEffect(() => {
        if (isSuccess && successRef.current && formRef.current) {
            // Animate form out and success in
            gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.4, display: "none" });
            gsap.fromTo(successRef.current,
                { opacity: 0, scale: 0.8, display: "none" },
                { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, display: "flex", ease: "back.out(1.7)" }
            );
        }
    }, [isSuccess]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // --- API KEY CONFIGURATION ---
        // Go to https://web3forms.com/ to get your free access key and paste it below
        const accessKey = "fde6d541-5014-4095-89f2-38803f0ab77d";

        // Simulation mode if key is not configured
        if (accessKey === "fde6d541-5014-4095-89f2-38803f0ab77d") {
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
            }, 1500);
            return;
        }

        // Production submission behavior
        const formData = new FormData(event.target);
        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setIsSubmitting(false);
                setIsSuccess(true);
            } else {
                console.error("Form submission failed");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={containerRef} id="contact" className="bg-black text-white py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-t from-zinc-900/40 to-transparent pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-center relative z-10">

                {/* Left Side: Copy */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="contact-anim text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                        Ready to <span className="text-zinc-500">start?</span>
                    </h2>
                    <p className="contact-anim text-xl md:text-2xl text-zinc-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Let's build something extraordinary together. Send us a message to discuss your next big project.
                    </p>
                    <div className="contact-anim flex flex-col gap-4 mt-12 text-zinc-500 font-mono text-sm">
                        <p>info@bufferworks.in</p>
                        <p>Working worldwide</p>
                    </div>
                </div>

                {/* Right Side: Form / Success State */}
                <div className="w-full md:w-1/2 max-w-lg mx-auto md:mx-0 contact-anim">
                    <div className="bg-zinc-950/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative min-h-[450px] flex justify-center flex-col">

                        {/* The Form */}
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholder="John Doe"
                                    className="bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-zinc-900 focus:border-blue-500/50 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="john@company.com"
                                    className="bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-zinc-900 focus:border-blue-500/50 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-2">Project Details</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    required
                                    rows="4"
                                    placeholder="Tell us about your vision..."
                                    className="bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:bg-zinc-900 focus:border-blue-500/50 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 bg-white text-black font-semibold text-sm uppercase tracking-widest py-5 px-6 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Success State */}
                        <div ref={successRef} className="absolute inset-0 hidden flex-col items-center justify-center text-center p-8 bg-zinc-950/90 rounded-3xl z-20">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                            <p className="text-zinc-400">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
