import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PageTransition from './PageTransition';
import Home from '../../pages/home/Home';
import About from '../../pages/about/About';
import Testimonials from '../../pages/testimonials/Testimonials';
import CategoryPage from '../../pages/category/Category'; 
import PricesPage from '../../pages/prices/Prices';
import ContactForm from '../../pages/contactForm/ContactForm'; 
import servicesData from '../../data/services.json'; 

function AnimatedRoutes({ language }) {
  const location = useLocation();

  const handleExitComplete = () => {
      window.scrollTo(0, 0);
      
      const scrollWrappers = document.querySelectorAll(
          '.app-layout, .page-container, .category-page-wrapper, .prices-page-wrapper, .home-scroll-container'
      );
      
      scrollWrappers.forEach(wrapper => {
          wrapper.scrollTo({ top: 0, behavior: 'instant' });
      });
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<PageTransition><Home language={language} /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About language={language} /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition><Testimonials language={language} /></PageTransition>} />
        
        <Route path="/contact" element={<PageTransition><ContactForm language={language} /></PageTransition>} />

        {servicesData.map((category, index) => {
            const slug = category.category.en.toLowerCase().replace(/\s+/g, '-');
            
            return (
                <React.Fragment key={index}>
                    <Route 
                        path={`/services/${slug}`} 
                        element={
                            <PageTransition>
                                <CategoryPage category={category} language={language} />
                            </PageTransition>
                        } 
                    />
                    <Route 
                        path={`/prices/${slug}`} 
                        element={
                            <PageTransition>
                                <PricesPage category={category} language={language} />
                            </PageTransition>
                        } 
                    />
                </React.Fragment>
            );
        })}

      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;