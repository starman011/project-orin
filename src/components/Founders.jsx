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
      bio: 'Visionary leader with 10+ years in tech innovation. Passionate about democratizing AI for creators worldwide.'
    },
    {
      initials: 'SH.',
      name: 'Saffeerul Haque Syed',
      role: 'CEO, CFO & Co-Founder',
      bio: 'Technical architect behind our AI platform. Expert in machine learning and distributed systems.'
    },
    {
      initials: 'AK',
      name: 'Afreen Anjum Khan',
      role: 'CEO, CPO, CDO & Co-Founder',
      bio: 'Product strategist focused on user experience. Champions human-centered design in AI applications.'
    }
  ];

  return (
    <section className="founders" id="founders" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Founders</h2>
          <p>The visionaries behind Orin's revolutionary platform</p>
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