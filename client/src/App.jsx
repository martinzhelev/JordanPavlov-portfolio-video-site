import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Rental from './pages/Rental';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Header />
      
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminn" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
