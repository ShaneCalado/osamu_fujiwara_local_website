import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import testimonialsData from '../../data/testimonials.json'; 
import servicesData from '../../data/services.json'; 
import './Testimonials.css';
import ContactBox from '../../components/contactBox/ContactBox'

const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.1 } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const TestimonialAccordion = ({ item, language, idx, openIndex, toggleAccordion }) => {
    const isOpen = openIndex === idx;
    const accordionRef = useRef(null);
    
    useEffect(() => {
        if (isOpen && accordionRef.current) {
            setTimeout(() => {
                accordionRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 150); 
        }
    }, [isOpen]);

    const badgeText = item.from_customer 
        ? (language === 'en' ? 'Testimonial' : 'お客様の声')
        : (language === 'en' ? 'Case Study' : '解決事例');

    const customTag = item.tag?.[language];

    let formattedQuote = item.review_quote[language];
    if (item.from_customer) {
        formattedQuote = language === 'ja' 
            ? `「${formattedQuote}」` 
            : `"${formattedQuote}"`;
    } 

    return (
        <motion.div 
            ref={accordionRef}
            layout 
            variants={itemVariants}
            className={`testimonial-accordion box-style-b ${isOpen ? 'is-open' : ''}`}
        >
            <div className="accordion-header" onClick={() => toggleAccordion(idx)}>
                
                <div className="header-left-group">
                    <span className={`testimonial-quote ${isOpen ? 'quote-open' : ''}`}>
                        {formattedQuote}
                    </span>
                </div>

                <div className="header-right-group">
                    <div className="badge-wrapper">
                        {customTag && (
                            <span className="testimonial-badge badge-category">
                                {customTag}
                            </span>
                        )}
                        <span className={`testimonial-badge ${item.from_customer ? 'badge-client' : 'badge-partner'}`}>
                            {badgeText}
                        </span>
                    </div>
                    
                    <span className={`dropdown-icon ${isOpen ? 'rotated' : ''}`}>▾</span>
                </div>

            </div>
            
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div 
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
                        className="accordion-content-wrapper"
                        style={{ overflow: "hidden" }}
                    >
                        <div className="accordion-content-inner">
                            
                            {item.image && (
                                <img 
                                    className="testimonial-body-avatar"
                                    src={item.image.startsWith('http') || item.image.startsWith('/') || item.image.startsWith('../../') ? item.image.replace('../../', '/') : `/images/client_photos/${item.image}`} 
                                    alt="Client"
                                />
                            )}
                            
                            <p className="testimonial-full-text">
                                {item.review_text[language]?.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                            
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const TestimonialsPage = ({ language }) => {
    const [openIndex, setOpenIndex] = useState(null); 

    useEffect(() => {
        testimonialsData.forEach((item) => {
            if (item.image) {
                const img = new Image();
                img.src = item.image.startsWith('../../') ? item.image.replace('../../', '/') : `/images/client_photos/${item.image}`;
            }
        });
    }, []);

    const toggleAccordion = (idx) => setOpenIndex(openIndex === idx ? null : idx);

    const activeTestimonial = openIndex !== null ? testimonialsData[openIndex] : null;
    
    let activeBgImage = activeTestimonial?.bg_image || null;

    if (!activeBgImage && activeTestimonial?.service_ids?.length > 0) {
        const targetServiceId = activeTestimonial.service_ids[0];
        
        for (const group of servicesData) {
            const foundService = group.items.find(item => item.id === targetServiceId);
            if (foundService && group.bgImage) {
                activeBgImage = group.bgImage;
                break;
            }
        }
    }

return (
        <motion.div 
            className="testimonials-page-container"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="testimonials-base-bg"></div>

            <AnimatePresence>
                {activeBgImage && (
                    <motion.div
                        key={activeBgImage}
                        className="testimonials-dynamic-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{
                            backgroundImage: `linear-gradient(rgba(187, 182, 182, 0.6), rgba(15, 17, 21, 0.8)), url(/images/${activeBgImage})`
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="testimonials-content-wrapper">
                
                <h1 className="testimonials-page-title">
                    {language === 'en' ? 'Customer Testimonials / Case Studies' : 'お客様の声／解決事例'}
                </h1>
                
                <AnimatePresence initial={false}>
                    {openIndex === null && (
                        <motion.div
                            className="header-wrapper" 
                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                            animate={{ height: "auto", opacity: 1, marginBottom: 15 }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <motion.div layout className="testimonials-accordion-scroll-box">
                    {testimonialsData.map((item, idx) => (
                        <TestimonialAccordion 
                            key={item.review_id || idx} 
                            item={item} 
                            language={language} 
                            idx={idx}
                            openIndex={openIndex}
                            toggleAccordion={toggleAccordion}
                        />
                    ))}
                </motion.div>

            </div>

            <ContactBox language={language} />
            
        </motion.div>
    );
};

export default TestimonialsPage;