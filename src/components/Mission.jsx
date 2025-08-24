import React from 'react';
import { Target, Users, Zap } from 'lucide-react';
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
      icon: <Target size={32} />,
      title: 'Innovation First',
      description: 'We believe in pushing boundaries and challenging the status quo to create breakthrough solutions that matter.'
    },
    {
      icon: <Users size={32} />,
      title: 'Collaboration',
      description: 'Building bridges between ideas and execution through seamless teamwork and AI-enhanced workflows.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Speed & Efficiency',
      description: 'Accelerating the journey from concept to creation with cutting-edge technology and intelligent automation.'
    }
  ];

  return (
    <section className="mission" id="mission" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Our Mission</h2>
          <p>Empowering creators and innovators to build the future, one idea at a time</p>
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