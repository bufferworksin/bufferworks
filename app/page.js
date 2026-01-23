import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
