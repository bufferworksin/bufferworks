import ScrollSequence from './ScrollSequence';

export default function Hero() {
    return (
        <section className="relative w-full">
            <ScrollSequence />
            {/* 
        The ScrollSequence handles the visual "hero" part with the canvas.
        We can overlay initial text if needed, but the plan is scrollytelling.
        The "Bufferworks" text is inside ScrollSequence for sticky positioning.
      */}
            <div className="h-screen flex items-center justify-center bg-black">
                <p className="text-zinc-400 text-xl md:text-2xl animate-pulse">Scroll to explore</p>
            </div>
        </section>
    );
}
