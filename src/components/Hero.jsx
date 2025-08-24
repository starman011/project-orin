import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
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
            Where We <span>Harbour Local</span> And Support Communities
          </h1>
          <p>
            Orin is revolutionizing the way teams collaborate, innovate, and bring 
            groundbreaking ideas to life with AI-powered tools.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">View Pricing</button>
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
              <Rocket size={48} />
              <h2>10x Faster</h2>
              <p>Innovation at the speed of thought</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;