import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Removed Routes and Route
import Header from './components/header/Header'; 
import Sidebar from './components/sidebar/Sidebar';
import AnimatedRoutes from './components/transition/AnimatedRoutes'; // Imported our new component
import './App.css';

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('siteLanguage') || 'ja';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('siteLanguage', language);
  }, [language]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="app-layout">
        
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          closeMenu={closeMenu}
          language={language}
          changeLanguage={setLanguage}
        />

        {/* The Header stays static and doesn't animate */}
        <Header 
          language={language} 
          changeLanguage={setLanguage} 
          toggleMobileMenu={toggleMobileMenu}
        />

        <main className="page-container">
          {/* All routing and page animations are now handled in here */}
          <AnimatedRoutes language={language} />
        </main>

      </div>
    </Router>
  );
}

export default App;