import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Founders from './components/Founders';
import Pricing from './components/Pricing';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Prism from './components/Prism';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isScrollingRef = useRef(false);
  const touchStartRef = useRef(0);
  const lastScrollTime = useRef(0);
  const sections = ['home', 'mission', 'founders', 'pricing', 'newsletter'];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isSectionScrollable = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    return el.scrollHeight > el.clientHeight + 1; // +1 for rounding
  };

  useEffect(() => {
    // For mobile, allow normal scrolling
    if (isMobile) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      return;
    }

    // Desktop scroll handling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleWheel = (e) => {
    const sectionId = sections[currentSection];
    const currentEl = document.getElementById(sectionId);

    // If this section has overflow (e.g., newsletter + footer),
    // let the browser scroll naturally and do NOT snap.
    if (isSectionScrollable(sectionId)) {
      return; // ← no preventDefault, no snap; native scroll works
    }

    // Otherwise: your existing snapping logic
    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime.current < 600) return;
    if (isScrollingRef.current) return;
    if (Math.abs(e.deltaY) < 30) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = currentSection + direction;

    if (nextSection >= 0 && nextSection < sections.length) {
      isScrollingRef.current = true;
      lastScrollTime.current = now;
      setCurrentSection(nextSection);
      const element = document.getElementById(sections[nextSection]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => { isScrollingRef.current = false; }, 600);
    }
  };

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      // If current section can scroll, don't snap — let native scroll happen.
      if (isSectionScrollable(sections[currentSection])) return;
    
      if (isScrollingRef.current) return;
    
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStartRef.current - touchEnd;
      if (Math.abs(diff) < 50) return;
    
      const now = Date.now();
      if (now - lastScrollTime.current < 600) return;
    
      const direction = diff > 0 ? 1 : -1;
      const nextSection = currentSection + direction;
    
      if (nextSection >= 0 && nextSection < sections.length) {
        isScrollingRef.current = true;
        lastScrollTime.current = now;
        setCurrentSection(nextSection);
    
        const element = document.getElementById(sections[nextSection]);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    
        setTimeout(() => { isScrollingRef.current = false; }, 600);
      }
    };

    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, sections, isMobile]);

  const handleDotClick = (index) => {
    if (isScrollingRef.current || index === currentSection) return;
    
    isScrollingRef.current = true;
    lastScrollTime.current = Date.now();
    setCurrentSection(index);
    
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  return (
    <div className={`App ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Prism Background */}
      <div className="prism-background">
        <Prism
          animationType="hover"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div>
      
      <Navbar currentSection={sections[currentSection]} isMobile={isMobile} />
      
      <div className="sections-container">
        <section id="home" className="section-wrapper">
          <Hero />
        </section>
        <section id="mission" className="section-wrapper">
          <Mission />
        </section>
        <section id="founders" className="section-wrapper">
          <Founders />
        </section>
        <section id="pricing" className="section-wrapper">
          <Pricing />
        </section>
        <section id="newsletter" className="section-wrapper">
          <Newsletter />
          <Footer />
        </section>
      </div>
      
      {!isMobile && (
        <div className="scroll-indicator">
          {sections.map((_, index) => (
            <div 
              key={index}
              className={`dot ${currentSection === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;