import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Founders from './components/Founders';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Mission />
      <Founders />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;