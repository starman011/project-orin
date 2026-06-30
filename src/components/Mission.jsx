import React from 'react';
import { Eye, Activity, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Mission.css';

const Mission = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const missionData = [
    {
      icon: <Eye size={32} />,
      title: 'Make the Invisible Visible',
      description: 'Aircraft, the ISS, satellites, rockets, asteroids, and distant galaxies — all on one living 3D globe you can explore at a glance.'
    },
    {
      icon: <Activity size={32} />,
      title: 'Real-Time & Open',
      description: 'We turn open, real-time feeds — ADS-B, TLE, and space-agency data — into something anyone can read the moment it happens.'
    },
    {
      icon: <Users size={32} />,
      title: 'Free for Everyone',
      description: 'The sky and near-space belong to all of us. ObjectTracer is free, ad-free, and open — no account, no paywall, no barrier.'
    }
  ];

  return (
    <section className="mission" id="mission" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Our Mission</h2>
          <p>To make everything moving above us — every flight, satellite, rocket, and distant galaxy — visible to everyone, in real time, for free.</p>
        </div>
        
        <div className="mission-grid">
          {missionData.map((item, index) => (
            <motion.div
              key={index}
              className="mission-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mission-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;