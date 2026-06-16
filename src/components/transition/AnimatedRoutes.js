import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PageTransition from './PageTransition';
import Home from '../../pages/home/Home';
// import Services from '../../pages/services/Services'; 

function AnimatedRoutes({ language }) {
  const location = useLocation();

  return (
    // mode="wait" forces the old page to completely fade out BEFORE the new page fades in
    <AnimatePresence mode="wait">
      {/* The key prop tells Framer Motion when a route actually changes */}
      <Routes location={location} key={location.pathname}>
        
        {/* Wrap your pages in the PageTransition component */}
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home language={language} />
            </PageTransition>
          } 
        />

        {/* Example of adding a second page later:
        <Route 
          path="/services" 
          element={
            <PageTransition>
              <Services language={language} />
            </PageTransition>
          } 
        /> 
        */}

      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;