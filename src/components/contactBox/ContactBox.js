import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom'; 
import contactData from '../../data/contact.json'; 
import './ContactBox.css';

const ContactBox = forwardRef(({ language }, ref) => {
    return (
        <footer className="global-footer-block" ref={ref}>
            <div className="footer-content-container">
                
                <div className="contact-details">
                    <h3>{contactData.officeName[language]}</h3>
                    
                    <div className="contact-info-block">
                        <p><strong>{contactData.addressLabel[language]}:</strong></p>
                        <p style={{ whiteSpace: 'pre-line' }}>{contactData.addressValue[language]}</p>
                    </div>

                    <div className="contact-info-block">
                        <p><strong>{contactData.phoneLabel[language]}:</strong></p>
                        <p>{contactData.phoneValue[language]}</p>
                    </div>

                    <div className="contact-info-block">
                        <p><strong>{contactData.emailLabel[language]}:</strong></p>
                        <p>{contactData.emailValue[language]}</p>
                    </div>

                    <div className="contact-info-block">
                        <p><strong>{contactData.hoursLabel[language]}:</strong></p>
                        <p style={{ whiteSpace: 'pre-line' }}>{contactData.hoursValue[language]}</p>
                    </div>

                    {/* NEW: SPA-safe Contact Button */}
                    <Link to="/contact" className="footer-contact-btn">
                        {language === 'en' ? 'Contact Form' : 'お問い合わせフォームへ'}
                    </Link>
                </div>

                <div className="map-container">
                    <iframe 
                        title="Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.3732138812666!2d135.3408406!3d34.8217078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f5dea051aeed%3A0x298975073830e9dd!2z6KGM5pS_5pu45aOr6Jek5Y6f5L-u5LqL5YuZ5omA!5e0!3m2!1sen!2sca!4v1781863656440!5m2!1sen!2sca" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </div>
        </footer>
    );
});

export default ContactBox;