import React from 'react';
import { motion } from 'framer-motion'; // <--- WE NEED THIS BACK!
import aboutData from '../../data/about.json'; 
import './About.css'; 

const AboutPage = ({ language }) => {
    return (
        // Replaced the standard <div> with a <motion.div> so your router can see it
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
                    <div className="about-header-row">
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
                    <div className="about-text-card">
                        <p className="about-paragraph">
                            {aboutData?.aboutContent?.[language]}
                        </p>
                    </div>
                </div>
            </section>


        </motion.div>
    );
};

export default AboutPage;