import React from 'react';
import { Crosshair, Activity, Boxes, Gauge, ArrowUpRight } from 'lucide-react';
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
      icon: <Crosshair size={28} />,
      title: 'Real-Time Detection',
      description: 'Pinpoint and label objects the instant they enter frame, with millisecond latency.'
    },
    {
      icon: <Boxes size={28} />,
      title: 'Multi-Object Tracking',
      description: 'Follow dozens of targets at once across frames without losing their identities.'
    },
    {
      icon: <Activity size={28} />,
      title: 'Live Analytics',
      description: 'Turn raw motion into dashboards — counts, paths, and dwell time as it happens.'
    },
    {
      icon: <Gauge size={28} />,
      title: 'Edge-Ready Speed',
      description: 'Optimized models run on-device, from cloud GPUs down to embedded cameras.'
    }
  ];

  return (
    <section className="showcase" id="showcase" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Highlight Project: ObjectTracer</h2>
          <p>See what Orin builds — AI-powered object detection and tracking, live in production</p>
        </div>

        <div className="showcase-grid">
          <motion.div
            className="showcase-feature"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="showcase-badge">Flagship</span>
            <h3 className="showcase-title">ObjectTracer.com</h3>
            <p className="showcase-tagline">
              Computer vision that watches, counts, and understands the world in
              motion — built end to end on the Orin platform.
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
