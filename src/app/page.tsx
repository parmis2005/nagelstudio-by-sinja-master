import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import StudioFilm from "@/components/StudioFilm";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import ReelsSection from "@/components/ReelsSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Welcome />
        <StudioFilm />
        <Services />
        <Pricing />
        <Gallery />
        <ReelsSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
