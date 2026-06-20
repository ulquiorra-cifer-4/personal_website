import { useState, useCallback } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Marquee from './components/Marquee';
import Works from './components/Works';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      {loaded && (
        <SmoothScroll>
          <div className="relative bg-bg min-h-screen noise-overlay">
            <Navbar />
            <main>
              <Hero />
              <Marquee text="Creative Design Studio" />
              <Manifesto />
              <Marquee text="Works & Projects" reverse />
              <Works />
              <Services />
              <Marquee text="Why Choose Us" />
              <WhyUs />
              <Testimonials />
              <Team />
              <Pricing />
              <FAQ />
              <Blog />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
