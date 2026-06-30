import React from 'react';
import { Plane, Satellite, Rocket, Sparkles, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Showcase.css';

const Showcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const capabilities = [
    {
      icon: <Plane size={28} />,
      title: 'Flights & Airports',
      description: 'Live aircraft positions, routes, altitude and speed from worldwide ADS-B. Search any flight, airline, or airport.'
    },
    {
      icon: <Satellite size={28} />,
      title: 'ISS & Satellites',
      description: 'Follow the ISS with live position and crew, plus orbital satellites computed from TLE data.'
    },
    {
      icon: <Rocket size={28} />,
      title: 'Launches & Asteroids',
      description: 'Rocket-launch countdowns and pad details, plus near-Earth asteroids and close approaches from NASA.'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Deep Space',
      description: 'Explore the DESI galaxy catalog and the cosmic web, rendered live in interactive 3D.'
    }
  ];

  const tags = ['Real-time', 'Free', 'No signup', 'Any device'];

  return (
    <section className="showcase" id="showcase" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Highlight Project: ObjectTracer</h2>
          <p>Track everything that moves above you — live, on one interactive 3D globe</p>
        </div>

        <div className="showcase-grid">
          <motion.div
            className="showcase-feature"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="showcase-badge">
              <Globe size={14} /> Flagship Project
            </span>
            <h3 className="showcase-title">ObjectTracer.com</h3>
            <p className="showcase-tagline">
              A real-time 3D tracker for flights, satellites, the ISS, rocket
              launches, asteroids, and deep-space galaxies — all rendered on a
              single interactive globe, right in your browser.
            </p>
            <div className="showcase-tags">
              {tags.map((tag) => (
                <span key={tag} className="showcase-tag">{tag}</span>
              ))}
            </div>
            <p className="showcase-meta">
              Built with React + Three.js, a Go backend, and open feeds (ADS-B,
              TLE, and space-agency data).
            </p>
            <div className="showcase-actions">
              <a
                className="btn-primary"
                href="https://objecttracer.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit ObjectTracer.com <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>

          <div className="showcase-capabilities">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                className="showcase-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              >
                <div className="showcase-card-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
