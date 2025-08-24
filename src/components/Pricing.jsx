import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Pricing.css';

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: [
        'Up to 5 team members',
        '100 AI generations/month',
        'Basic analytics',
        'Email support',
        '1GB storage'
      ],
      featured: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      features: [
        'Up to 20 team members',
        'Unlimited AI generations',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Custom integrations'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited team members',
        'Unlimited everything',
        'Custom AI models',
        'Dedicated support',
        'Unlimited storage',
        'SLA guarantee'
      ],
      featured: false
    }
  ];

  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your needs</p>
        </div>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="pricing-tier">{plan.name}</div>
              <div className="pricing-price">
                {plan.price}<span>{plan.period}</span>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={18} /> {feature}
                  </li>
                ))}
              </ul>
              <button className={plan.featured ? 'btn-primary' : 'btn-secondary'}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;