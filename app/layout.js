import { Outfit } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/components/ReactLenis"; // Wrapper needed for clean client component usage
import Navbar from "@/components/Navbar";

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
      <body className={`${outfit.variable} antialiased bg-black text-white`}>
        <Navbar />
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
