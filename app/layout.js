import { Outfit } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/components/ReactLenis";
import Navbar from "@/components/Navbar";
import Analytics from "./analytics";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Bufferworks",
  description: "Tech Agency",
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
          <Analytics />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
