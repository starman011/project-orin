import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
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
  const animationFrameRef = useRef(null);
  const scrollAccumulator = useRef(0);
  const scrollDirection = useRef(0);
  const scrollTimeout = useRef(null);
  const boundaryResetTimeout = useRef(null);
  
  const sections = useMemo(() => ['home', 'mission', 'founders', 'pricing', 'newsletter'], []);

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

  const executeScroll = useCallback((direction) => {
    const nextSection = currentSection + direction;
    
    // Validate boundaries more strictly
    if (nextSection < 0 || nextSection >= sections.length) {
      // Reset scroll state if we hit boundaries
      scrollAccumulator.current = 0;
      scrollDirection.current = 0;
      return;
    }
    
    isScrollingRef.current = true;
    lastScrollTime.current = Date.now();
    scrollAccumulator.current = 0;
    scrollDirection.current = 0; // Reset direction tracker
    
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = null;
    }
    
    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Use requestAnimationFrame for smooth state updates
    animationFrameRef.current = requestAnimationFrame(() => {
      setCurrentSection(nextSection);
      const element = document.getElementById(sections[nextSection]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Add a longer delay specifically for upward scrolling to ensure proper state sync
      const resetDelay = direction < 0 ? 1000 : 800;
      
      setTimeout(() => { 
        isScrollingRef.current = false; 
        animationFrameRef.current = null;
      }, resetDelay);
    });
  }, [currentSection, sections]);

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

      // Special handling for newsletter section - allow some scrolling but still enable snapping
      if (isSectionScrollable(sectionId) && sectionId === 'newsletter') {
        const element = document.getElementById(sectionId);
        const isAtTop = element.scrollTop <= 5;
        const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 5;
        
        // Only allow native scroll if we're in the middle of the section
        if (!isAtTop && !isAtBottom) {
          return; // Let native scroll handle middle area
        }
        
        // If at top/bottom of newsletter, allow snapping to other sections
        const direction = e.deltaY > 0 ? 1 : -1;
        if ((isAtTop && direction === -1) || (isAtBottom && direction === 1)) {
          // Allow snapping when trying to scroll out of newsletter
        } else {
          return; // Let native scroll handle within newsletter
        }
      } else if (isSectionScrollable(sectionId)) {
        return; // For other scrollable sections, let browser handle
      }

      e.preventDefault();
      
      // If currently scrolling, ignore new scroll events
      if (isScrollingRef.current) return;
      
      const now = Date.now();
      const deltaY = e.deltaY;
      
      // Ignore very small movements (accidental touches)
      if (Math.abs(deltaY) < 5) return;
      
      const direction = deltaY > 0 ? 1 : -1;
      
      // Debug logging
      console.log('Scroll detected:', { 
        currentSection, 
        direction, 
        deltaY, 
        sectionId: sections[currentSection],
        nextWouldBe: currentSection + direction 
      });
      
      // Check if we're already at boundaries and trying to go further
      if ((currentSection === 0 && direction === -1) || 
          (currentSection === sections.length - 1 && direction === 1)) {
        console.log('Boundary hit, ignoring scroll');
        // Reset scroll state when hitting boundaries
        scrollAccumulator.current = 0;
        scrollDirection.current = 0;
        return;
      }
      
      // Reset accumulator if direction changed or too much time passed
      if (scrollDirection.current !== direction || (now - lastScrollTime.current) > 150) {
        scrollAccumulator.current = 0;
        scrollDirection.current = direction;
      }
      
      // Accumulate scroll delta
      scrollAccumulator.current += Math.abs(deltaY);
      lastScrollTime.current = now;
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Dynamic threshold based on scroll speed and input type
      let threshold = 15; // Base threshold
      
      // Detect input device type and adjust threshold accordingly
      if (Math.abs(deltaY) < 4) {
        // Very fine scrolling (high-precision trackpad)
        threshold = 8;
      } else if (Math.abs(deltaY) < 20) {
        // Trackpad scrolling
        threshold = 10;
      } else if (Math.abs(deltaY) < 100) {
        // Mouse wheel scrolling
        threshold = 15;
      } else {
        // Fast/aggressive scrolling
        threshold = 25;
      }
      
      // Execute scroll immediately if threshold met
      if (scrollAccumulator.current >= threshold) {
        executeScroll(direction);
        return;
      }
      
      // Otherwise, set a timeout to execute scroll after a short delay
      // Shorter delay for more responsive feel
      scrollTimeout.current = setTimeout(() => {
        if (scrollAccumulator.current > 0 && !isScrollingRef.current) {
          executeScroll(direction);
        }
      }, 30);
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
      
      // Much lower threshold for touch - single swipe should work
      if (Math.abs(diff) < 15) return;
    
      const direction = diff > 0 ? 1 : -1;
      
      // Execute scroll immediately for touch gestures
      executeScroll(direction);
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
      
      // Clean up any pending animation frames and timeouts
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }
      if (boundaryResetTimeout.current) {
        clearTimeout(boundaryResetTimeout.current);
        boundaryResetTimeout.current = null;
      }
    };
  }, [currentSection, sections, isMobile, executeScroll]);

  const handleDotClick = (index) => {
    if (isScrollingRef.current || index === currentSection) return;
    
    // Calculate direction for smooth transition
    const direction = index > currentSection ? 1 : -1;
    const steps = Math.abs(index - currentSection);
    
    // For multiple steps, animate through each section quickly
    if (steps > 1) {
      isScrollingRef.current = true;
      let currentStep = 0;
      
      const animateStep = () => {
        if (currentStep < steps) {
          const nextIndex = currentSection + (direction * (currentStep + 1));
          setCurrentSection(nextIndex);
          
          const element = document.getElementById(sections[nextIndex]);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
          
          currentStep++;
          if (currentStep < steps) {
            setTimeout(animateStep, 300);
          } else {
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 500);
          }
        }
      };
      
      animateStep();
    } else {
      // Single step - use regular execution
      executeScroll(direction);
    }
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