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
        <div className="logo" onClick={() => scrollToSection('home')}>
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="Orion logo"
            className="logo-img"
          />
          <span className="logo-text">Orion</span>
        </div>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('mission')}
            className={`nav-link ${currentSection === 'mission' ? 'active' : ''}`}
          >
            Mission
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('founders')}
            className={`nav-link ${currentSection === 'founders' ? 'active' : ''}`}
          >
            Team
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('showcase')}
            className={`nav-link ${currentSection === 'showcase' ? 'active' : ''}`}
          >
            Showcase
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className={`nav-link ${currentSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </button>
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