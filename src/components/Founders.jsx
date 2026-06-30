import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Founders.css';

const Founders = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const founders = [
    {
      initials: 'MK.',
      name: 'Md Saqlain Khan',
      role: 'CEO, CTO & Co-Founder',
      bio: 'Visionary leader with 10+ years in tech. Driven to make the sky and near-space visible to everyone, in real time.'
    },
    {
      initials: 'SH.',
      name: 'Safeerul Haque Syed',
      role: 'CEO, CFO & Co-Founder',
      bio: 'Technical architect behind the platform. Expert in real-time data pipelines, 3D rendering, and distributed systems.'
    },
    {
      initials: 'AK',
      name: 'Afreen Anjum Khan',
      role: 'CEO, CPO, CDO & Co-Founder',
      bio: 'Product strategist focused on user experience. Champions clear, human-centered design for complex live data.'
    }
  ];

  return (
    <section className="founders" id="founders" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Founders</h2>
          <p>The team building ObjectTracer and the platforms behind Orion</p>
        </div>
        
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              className="founder-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="founder-avatar">{founder.initials}</div>
              <h3 className="founder-name">{founder.name}</h3>
              <p className="founder-role">{founder.role}</p>
              <p className="founder-bio">{founder.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;