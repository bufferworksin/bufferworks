"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSequence() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Frame settings
        const frameCount = 480;
        const currentFrame = { index: 1 };

        // Function to get image path
        const getImagePath = (index) =>
            `/transitions2-optimized/Smooth_transition_from_1080p_202601231301_${index.toString().padStart(3, "0")}.webp`;

        // Preload images
        const images = [];
        let imagesLoaded = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = getImagePath(i);
            images.push(img);
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === 1) { // Render first frame immediately
                    render();
                }
            }
        }

        const render = () => {
            const img = images[currentFrame.index - 1];
            if (img) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // "Cover" fit
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const animation = gsap.to(currentFrame, {
            index: frameCount,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "500%", // Longer scroll distance for smoother playback
                scrub: 0.5,
                pin: true,
                // markers: true, // Remove for production
            },
            onUpdate: () => {
                // Ensure index is an integer
                currentFrame.index = Math.round(currentFrame.index);
                render();
            }
        });

        // Resize handler
        const handleResize = () => render();
        window.addEventListener("resize", handleResize);

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black">
            <canvas ref={canvasRef} className="block w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Optional Overlay Content */}
                <h1 className="text-5xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 opacity-90 mix-blend-difference z-10">
                    BUFFERWORKS
                </h1>
            </div>
        </div>
    );
}
