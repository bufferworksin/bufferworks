import { Outfit } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/components/ReactLenis";
import Navbar from "@/components/Navbar";
import Analytics from "./analytics";
import { Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  metadataBase: new URL('https://bufferworks.in'),
  title: {
    default: "Bufferworks | Next-Gen Tech Agency & Software Development",
    template: "%s | Bufferworks Tech Agency"
  },
  description: "Bufferworks is a premium tech agency specializing in modern cross-platform web applications, customized AI agents, CRM systems, mobile app development, and high-end UI/UX design.",
  keywords: ["tech agency", "web agency", "website building", "customize ai agents", "software development", "UI/UX design", "mobile app development", "digital solutions"],
  authors: [{ name: "Bufferworks" }],
  openGraph: {
    title: "Bufferworks | Premium Tech Agency",
    description: "Building the future of the web. We craft scalable web applications, customized AI agents, and high-end UI/UX designs.",
    url: "https://bufferworks.in",
    siteName: "Bufferworks",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Bufferworks Tech Agency Banner",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bufferworks | Elite Software & Tech Agency",
    description: "Premium software development, AI agents, and modern UI/UX.",
    images: ["/og-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bufferworks.in/#website",
        "url": "https://bufferworks.in/",
        "name": "Bufferworks",
        "description": "Premium tech agency specializing in website building and tailored AI agents."
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://bufferworks.in/#organization",
        "name": "Bufferworks",
        "url": "https://bufferworks.in/",
        "logo": "https://bufferworks.in/og-image.jpeg",
        "image": "https://bufferworks.in/og-image.jpeg",
        "description": "Bufferworks provides comprehensive digital solutions engineered to elevate businesses, specializing in custom AI agents, web applications, CRM systems, and holistic software development.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "priceRange": "$$$"
      }
    ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RHPWMVX6LK"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RHPWMVX6LK');
          `}
        </Script>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={`${outfit.variable} antialiased bg-black text-white`}>
        <Navbar />
        <ReactLenis
          root
          options={{
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 0.8,
          }}
        >
          <Preloader />
          <CustomCursor />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
