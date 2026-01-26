# Bufferworks

A premium, high-performance digital agency portfolio built with **Next.js 16**, **GSAP**, and **Lenis Scroll**.

Bufferworks is designed to showcase high-end digital services and selected works with immersive interactions, smooth scrolling physics, and cinema-grade "scrollytelling" animations.

## 🚀 Key Features

- **Cinematic Scrollytelling**: Frame-by-frame canvas animation sequence driven by scroll position.
- **Weighted Smooth Scroll**: Custom-tuned [Lenis](https://github.com/darkroomengineering/lenis) configuration for a luxurious, heavy-scroll feel.
- **Scroll Resistance Physics**: Sections (Work, Services) feature a magnetic "pin & snap" resistance to control user momentum and focus attention.
- **Interactive UI**:
  - Dynamic "Notch" Navbar with expanding interactions.
  - Zig-zag mobile layouts for case studies.
  - Hover-responsive cards with gradient reveals.
- **Performance Optimized**:
  - `next/font` (Outfit typeface).
  - Optimized WebP frames for animation.
  - Tailwind CSS v4 for zero-runtime styling.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock)](https://gsap.com/)
  - `ScrollTrigger` for scroll-driven animations.
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Deployment**: Vercel

## 📦 Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/bufferworksin/bufferworks.git
    cd bufferworks
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

    _Note: The dev server runs on port `1000` by default (configured in package.json)._

4.  **Open the app**:
    Visit [http://localhost:1000](http://localhost:1000) in your browser.

## 📂 Project Structure

```
├── app/
│   ├── globals.css        # Global styles & Tailwind directives
│   ├── layout.js          # Root layout with Lenis wrapper & Navbar
│   └── page.js            # Main landing page composition
├── components/
│   ├── Hero.jsx           # Canvas scrollytelling section
│   ├── Navbar.jsx         # Interactive dynamic notch navigation
│   ├── Services.jsx       # Grid layout with pinning interaction
│   ├── Work.jsx           # Featured projects with snapping physics
│   ├── ScrollSequence.jsx # Core canvas animation logic
│   └── ReactLenis.jsx     # Smooth scroll configuration wrapper
├── public/
│   ├── transitions2-optimized/ # Scrollytelling WebP frames
│   └── images/                 # Project assets
└── scripts/
    └── optimize-images.js      # Utility for frame optimization
```

## 🎨 Design Philosophy

The site prioritizes **motion** and **feel**. Instead of standard scrolling, Bufferworks uses "Scroll Resistance" to create stopping points at key content sections, forcing the user to pause and engage with the headlines ("Selected Work", "Our Services") before continuing.

## 📄 License

© 2026 Bufferworks. All rights reserved.
