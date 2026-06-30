import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            We Are the Parent Company of <span>ObjectTracer</span>
          </h1>
          <p>
            Orion builds real-time platforms that make the world above us
            visible to everyone. ObjectTracer, our flagship, puts every flight,
            satellite, rocket, and distant galaxy on one live 3D globe.
          </p>
          <div className="hero-buttons">
            <a
              className="btn-primary"
              href="https://objecttracer.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore ObjectTracer <ArrowUpRight size={18} />
            </a>
            <button
              className="btn-secondary"
              onClick={() => {
                const el = document.getElementById('showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              See What We Build
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-visual-box">
            <div className="hero-visual-content">
              <Globe size={48} />
              <h2>One Live Globe</h2>
              <p>Everything above the horizon, in real time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;