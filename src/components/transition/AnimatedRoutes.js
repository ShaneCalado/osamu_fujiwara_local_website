import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PageTransition from './PageTransition';
import Home from '../../pages/home/Home';
import About from '../../pages/about/About'; 
import Testimonials from '../../pages/testimonials/Testimonials'; 

function AnimatedRoutes({ language }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home language={language} />
            </PageTransition>
          } 
        />

        <Route 
          path="/about" 
          element={
            <PageTransition>
              <About language={language} />
            </PageTransition>
          } 
        />

        <Route 
          path="/testimonials" 
          element={
            <PageTransition>
              <Testimonials language={language} />
            </PageTransition>
          } 
        />

      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;