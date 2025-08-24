import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="container">
        <motion.div 
          className="newsletter-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="newsletter-header">
            <Sparkles className="newsletter-icon" size={48} />
            <h2>Stay in the Loop</h2>
            <p>Get exclusive updates, early access to features, and insider tips delivered to your inbox</p>
          </div>

          {!subscribed ? (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-subscribe">
                  Subscribe
                </button>
              </div>
              <p className="newsletter-privacy">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <motion.div 
              className="success-message"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle size={48} />
              <h3>Welcome aboard!</h3>
              <p>Check your inbox for a confirmation email</p>
            </motion.div>
          )}

          <div className="newsletter-features">
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <span>Weekly insights</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💡</span>
              <span>Pro tips</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎁</span>
              <span>Exclusive offers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
