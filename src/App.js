import React, { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { performanceMonitor, throttle } from './utils/performance';
import './App.css';

// Lazy load heavy components
const Mission = lazy(() => import('./components/Mission'));
const Founders = lazy(() => import('./components/Founders'));
const Pricing = lazy(() => import('./components/Pricing'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Footer = lazy(() => import('./components/Footer'));
const Prism = lazy(() => import('./components/Prism'));

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
  const preloadedComponents = useRef(new Set());
  
  const sections = useMemo(() => ['home', 'mission', 'founders', 'pricing', 'newsletter'], []);

  // Preload components strategy
  const preloadComponent = useCallback(async (componentName) => {
    if (preloadedComponents.current.has(componentName)) return;
    
    try {
      switch (componentName) {
        case 'Mission':
          await import('./components/Mission');
          break;
        case 'Founders':
          await import('./components/Founders');
          break;
        case 'Pricing':
          await import('./components/Pricing');
          break;
        case 'Newsletter':
          await import('./components/Newsletter');
          break;
        case 'Footer':
          await import('./components/Footer');
          break;
        default:
          break;
      }
      preloadedComponents.current.add(componentName);
    } catch (error) {
      console.error(`Failed to preload ${componentName}:`, error);
    }
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Progressive component preloading after initial load
  useEffect(() => {
    const preloadSequence = async () => {
      // Wait for initial render to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Preload next section component first
      if (currentSection === 0) {
        const startTime = performance.now();
        await preloadComponent('Mission');
        performanceMonitor.measureComponentLoad('Mission', startTime);
      }
      
      // Then preload remaining components in priority order
      await new Promise(resolve => setTimeout(resolve, 100));
      const foundersStart = performance.now();
      await preloadComponent('Founders');
      performanceMonitor.measureComponentLoad('Founders', foundersStart);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      const pricingStart = performance.now();
      await preloadComponent('Pricing');
      performanceMonitor.measureComponentLoad('Pricing', pricingStart);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      const newsletterStart = performance.now();
      await preloadComponent('Newsletter');
      performanceMonitor.measureComponentLoad('Newsletter', newsletterStart);
      
      const footerStart = performance.now();
      await preloadComponent('Footer');
      performanceMonitor.measureComponentLoad('Footer', footerStart);
    };

    preloadSequence();
  }, [currentSection, preloadComponent]);

  // Performance monitoring setup
  useEffect(() => {
    // Log metrics every 30 seconds in development
    const metricsInterval = setInterval(() => {
      performanceMonitor.logMetrics();
    }, 30000);

    return () => clearInterval(metricsInterval);
  }, []);

  const isSectionScrollable = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    return el.scrollHeight > el.clientHeight + 1; // +1 for rounding
  };

  const executeScroll = useCallback((direction) => {
    const scrollStartTime = performance.now();
    const nextSection = currentSection + direction;
    
    // Validate boundaries more strictly
    if (nextSection < 0 || nextSection >= sections.length) {
      scrollAccumulator.current = 0;
      scrollDirection.current = 0;
      return;
    }
    
    // Prevent double scrolling - set lock immediately
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    lastScrollTime.current = Date.now();
    scrollAccumulator.current = 0;
    scrollDirection.current = 0;
    
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = null;
    }
    
    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Optimized scroll with performance monitoring
    animationFrameRef.current = requestAnimationFrame(() => {
      setCurrentSection(nextSection);
      const element = document.getElementById(sections[nextSection]);
      if (element) {
        // Use faster, more responsive scrolling
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
        });
      }
      
      // Longer reset delay to prevent double scrolling
      const resetDelay = 600;
      
      setTimeout(() => { 
        isScrollingRef.current = false; 
        animationFrameRef.current = null;
        performanceMonitor.measureScrollLatency(scrollStartTime);
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


    // Optimized wheel handler with throttling
    const handleWheel = throttle((e) => {
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
      if (Math.abs(deltaY) < 3) return;
      
      const direction = deltaY > 0 ? 1 : -1;
      
      // Check if we're already at boundaries and trying to go further
      if ((currentSection === 0 && direction === -1) || 
          (currentSection === sections.length - 1 && direction === 1)) {
        scrollAccumulator.current = 0;
        scrollDirection.current = 0;
        return;
      }
      
      // Reset accumulator if direction changed or too much time passed
      if (scrollDirection.current !== direction || (now - lastScrollTime.current) > 200) {
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
      
      // Increased thresholds to prevent double scrolling
      let threshold = 15; // Increased base threshold
      
      // Detect input device type and adjust threshold accordingly
      if (Math.abs(deltaY) < 4) {
        // Very fine scrolling (high-precision trackpad)
        threshold = 10;
      } else if (Math.abs(deltaY) < 20) {
        // Trackpad scrolling
        threshold = 12;
      } else if (Math.abs(deltaY) < 100) {
        // Mouse wheel scrolling
        threshold = 15;
      } else {
        // Fast/aggressive scrolling
        threshold = 20;
      }
      
      // Execute scroll immediately if threshold met
      if (scrollAccumulator.current >= threshold) {
        executeScroll(direction);
        return;
      }
      
      // Longer delay to prevent double scrolling
      scrollTimeout.current = setTimeout(() => {
        if (scrollAccumulator.current > 0 && !isScrollingRef.current) {
          executeScroll(direction);
        }
      }, 50);
    }, 16); // ~60fps throttling

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      // If current section can scroll, don't snap — let native scroll happen.
      if (isSectionScrollable(sections[currentSection])) return;
    
      if (isScrollingRef.current) return;
    
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStartRef.current - touchEnd;
      
      // Higher threshold for touch to prevent accidental double scrolling
      if (Math.abs(diff) < 30) return;
    
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

  const handleDotClick = useCallback((index) => {
    if (isScrollingRef.current || index === currentSection) return;
    
    // Set scrolling lock immediately to prevent double clicks
    isScrollingRef.current = true;
    
    // Calculate direction for smooth transition
    const direction = index > currentSection ? 1 : -1;
    const steps = Math.abs(index - currentSection);
    
    // Reset scroll state
    scrollAccumulator.current = 0;
    scrollDirection.current = 0;
    
    // Clear any pending timeouts
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = null;
    }
    
    // For multiple steps, animate through each section quickly
    if (steps > 1) {
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
            }, 600);
          }
        }
      };
      
      animateStep();
    } else {
      // Single step - direct navigation
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
    }
  }, [currentSection, sections]);

  // Loading fallback component
  const LoadingFallback = ({ section }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px',
    }}>
      Loading {section}...
    </div>
  );

  return (
    <div className={`App ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Prism Background */}
      <div className="prism-background">
        <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)' }} />}>
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
        </Suspense>
      </div>
      
      <Navbar currentSection={sections[currentSection]} isMobile={isMobile} />
      
      <div className="sections-container">
        <section id="home" className="section-wrapper">
          <Hero />
        </section>
        <section id="mission" className="section-wrapper">
          <Suspense fallback={<LoadingFallback section="Mission" />}>
            <Mission />
          </Suspense>
        </section>
        <section id="founders" className="section-wrapper">
          <Suspense fallback={<LoadingFallback section="Founders" />}>
            <Founders />
          </Suspense>
        </section>
        <section id="pricing" className="section-wrapper">
          <Suspense fallback={<LoadingFallback section="Pricing" />}>
            <Pricing />
          </Suspense>
        </section>
        <section id="newsletter" className="section-wrapper">
          <Suspense fallback={<LoadingFallback section="Newsletter" />}>
            <Newsletter />
            <Footer />
          </Suspense>
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