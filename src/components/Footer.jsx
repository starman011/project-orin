import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <img
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt="Orion logo"
                className="footer-logo-img"
              />
              <span>Orion</span>
            </h3>
            <p>Parent company of ObjectTracer — making everything above the horizon visible to everyone, in real time.</p>
            <div className="social-links">
              <button type="button" aria-label="GitHub"><Github size={20} /></button>
              <button type="button" aria-label="Twitter"><Twitter size={20} /></button>
              <button type="button" aria-label="LinkedIn"><Linkedin size={20} /></button>
              <button type="button" aria-label="Email"><Mail size={20} /></button>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><button type="button" className="footer-link" onClick={() => scrollToSection('home')}>Features</button></li>
                <li><button type="button" className="footer-link" onClick={() => scrollToSection('showcase')}>Showcase</button></li>
                <li><button type="button" className="footer-link">API</button></li>
                <li><button type="button" className="footer-link">Documentation</button></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><button type="button" className="footer-link" onClick={() => scrollToSection('mission')}>Mission</button></li>
                <li><button type="button" className="footer-link" onClick={() => scrollToSection('founders')}>Team</button></li>
                <li><button type="button" className="footer-link">Careers</button></li>
                <li><button type="button" className="footer-link">Blog</button></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><button type="button" className="footer-link" onClick={() => scrollToSection('contact')}>Contact</button></li>
                <li><button type="button" className="footer-link">Help Center</button></li>
                <li><button type="button" className="footer-link">Status</button></li>
                <li><button type="button" className="footer-link">Terms of Service</button></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Orion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;