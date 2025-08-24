import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">Orin</div>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a 
            onClick={() => scrollToSection('home')}
            className={currentSection === 'home' ? 'active' : ''}
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('mission')}
            className={currentSection === 'mission' ? 'active' : ''}
          >
            Mission
          </a>
          <a 
            onClick={() => scrollToSection('founders')}
            className={currentSection === 'founders' ? 'active' : ''}
          >
            Team
          </a>
          <a 
            onClick={() => scrollToSection('pricing')}
            className={currentSection === 'pricing' ? 'active' : ''}
          >
            Pricing
          </a>
          <a 
            onClick={() => scrollToSection('contact')}
            className={currentSection === 'contact' ? 'active' : ''}
          >
            Contact
          </a>
          <button className="btn-primary">Get Started</button>
        </div>

        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;