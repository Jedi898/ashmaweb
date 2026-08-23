import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Portfolio from "@/components/Portfolio";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-[#f5f0e8]">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e8a87c]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Gallery />
        <div className="section-divider" />
        <Portfolio />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

