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
            <h3 className="footer-logo">Orin</h3>
            <p>Transforming ideas into reality with AI-powered innovation.</p>
            <div className="social-links">
              <a href="#" aria-label="GitHub"><Github size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a onClick={() => scrollToSection('home')}>Features</a></li>
                <li><a onClick={() => scrollToSection('pricing')}>Pricing</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a onClick={() => scrollToSection('mission')}>Mission</a></li>
                <li><a onClick={() => scrollToSection('founders')}>Team</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Orin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;