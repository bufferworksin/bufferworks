"use client";
import { useEffect, useRef, cloneElement } from "react";
import gsap from "gsap";

export default function Magnetic({ children }) {
    const magneticRef = useRef(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const currentElement = magneticRef.current;
        
        if(currentElement) {
            currentElement.addEventListener("mousemove", handleMouseMove);
            currentElement.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if(currentElement) {
                currentElement.removeEventListener("mousemove", handleMouseMove);
                currentElement.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    // We use cloneElement to attach the ref without adding an extra div
    return cloneElement(children, { ref: magneticRef });
}
