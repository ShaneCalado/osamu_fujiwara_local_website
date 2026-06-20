import React from 'react';
import { motion } from 'framer-motion'; 
import aboutData from '../../data/about.json'; 
import './About.css'; 
import ContactBox from '../../components/contactBox/ContactBox';

const AboutPage = ({ language }) => {
    return (
        <motion.div 
            className="about-page-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            
            {/* SECTION 1: HEADER & INTRO */}
            <section className="about-section intro-section">
                <div className="about-content-container">
                    
                    {/* THE FIX: Injected box-style-a */}
                    <div className="about-header-row box-style-a">
                        
                        <div className="about-text-content">
                            <h2>{aboutData?.aboutTitle?.[language] || "About Us"}</h2>
                            <p className="intro-text-about">{aboutData?.aboutIntro?.[language]}</p>
                        </div>
                        <img 
                            src="/images/headshot.jpg" 
                            alt="Fujiwara Headshot" 
                            className="about-headshot"
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 2: MAIN CONTENT */}
            <section className="about-section content-section">
                <div className="about-content-container">
                    
                    {/* THE FIX: Injected box-style-a */}
                    <div className="about-text-card box-style-a">
                        <p className="about-paragraph">
                            {aboutData?.aboutContent?.[language]}
                        </p>
                    </div>
                    
                </div>
            </section>

            <ContactBox language={language} />

        </motion.div>
    );
};

export default AboutPage;