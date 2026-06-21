import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import contactData from '../../data/contactForm.json';
import servicesData from '../../data/services.json';
import './ContactForm.css';

const ContactForm = ({ language }) => {
    const formRef = useRef(null); 
    const textareaRef = useRef(null); 
    const location = useLocation();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [isSending, setIsSending] = useState(false);

    // Auto-fill both dropdowns if navigated from a Service Details page
    useEffect(() => {
        if (location.state && location.state.serviceId) {
            const targetId = location.state.serviceId;
            let foundCategoryIndex = -1;
            
            servicesData.forEach((group, idx) => {
                if (group.items.some(item => item.id === targetId)) {
                    foundCategoryIndex = idx;
                }
            });

            if (foundCategoryIndex !== -1) {
                setSelectedCategory(foundCategoryIndex.toString());
                setSelectedService(targetId);
            }
        }
    }, [location.state]);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.sendForm(
            'service_j1m3iej', 
            'template_pbaws9c', 
            formRef.current, 
            '3W2zWAI8-d8gq5Xq-'
        )
        .then((result) => {
            alert(contactData.successAlert[language]);
            formRef.current.reset(); 
            setSelectedCategory("");
            setSelectedService("");
            setIsSending(false);
        }, (error) => {
            alert(contactData.errorAlert[language]);
            setIsSending(false);
        });
    };

    let finalServiceString = "";
    if (selectedCategory === "general") {
        finalServiceString = contactData.generalInquiry[language];
    } else if (selectedCategory !== "" && selectedService !== "") {
        const serviceObj = servicesData[selectedCategory].items.find(i => i.id === selectedService);
        if (serviceObj) {
            finalServiceString = serviceObj.name[language];
        }
    }

    return (
        <div className="page-fade form-page-container">
            <h2 className="form-page-title">{contactData.contactTitle[language]}</h2>
            <p className="intro-text">{contactData.contactIntro[language]}</p>
            
            <div className="form-card box-style-a">
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                    
                    <input type="hidden" name="service_type" value={finalServiceString} />
                    
                    {/* Name */}
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="name">{contactData.nameLabel[language]}</label>
                            <span className="required-badge">{contactData.requiredBadge[language]}</span>
                        </div>
                        <div className="form-input-group">
                            <input type="text" id="name" name="user_name" placeholder="John Doe / 山田 太郎" required />
                        </div>
                    </div>
                    
                    {/* Email */}
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="email">{contactData.emailLabel[language]}</label>
                            <span className="required-badge">{contactData.requiredBadge[language]}</span>
                        </div>
                        <div className="form-input-group">
                            <input type="email" id="email" name="user_email" placeholder="email@example.com" required />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="phone">{contactData.phoneLabel[language]}</label>
                            <span className="required-badge">{contactData.requiredBadge[language]}</span>
                        </div>
                        <div className="form-input-group">
                            <input type="tel" id="phone" name="user_phone" placeholder="090-1234-5678" required />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="address">{contactData.addressLabel[language]}</label>
                            <span className="optional-badge">{contactData.optionalBadge[language]}</span>
                        </div>
                        <div className="form-input-group">
                            <input type="text" id="address" name="user_address" placeholder={language === 'en' ? 'City, State, Zip' : '都道府県・市区町村'} />
                        </div>
                    </div>

                    {/* STEP 1: Category Dropdown */}
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="service_category">{contactData.serviceCategoryLabel[language]}</label>
                            <span className="optional-badge">{contactData.optionalBadge[language]}</span>
                        </div>
                        <div className="form-input-group">
                            <select 
                                id="service_category" 
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedService(""); 
                                }}
                            >
                                <option value="" style={{color: "black"}}>{contactData.selectCategory[language]}</option>
                                <option value="general" style={{color: "black"}}>{contactData.generalInquiry[language]}</option>
                                
                                {servicesData.map((group, idx) => {
                                    if (group.includeInContactForm || selectedCategory === idx.toString()) {
                                        return (
                                            <option key={idx} value={idx} style={{color: "black"}}>
                                                {group.category[language]}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}

                            </select>
                        </div>
                    </div>

                    {/* STEP 2: Specific Service Dropdown */}
                    {selectedCategory !== "" && selectedCategory !== "general" && (
                        <div className="form-row reveal-row">
                            <div className="form-label">
                                <label htmlFor="specific_service">{contactData.specificServiceLabel[language]}</label>
                                <span className="optional-badge">{contactData.optionalBadge[language]}</span>
                            </div>
                            <div className="form-input-group">
                                <select 
                                    id="specific_service" 
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                >
                                    <option value="" style={{color: "black"}}>{contactData.selectSpecific[language]}</option>
                                    {servicesData[selectedCategory].items.map(item => (
                                        <option key={item.id} value={item.id} style={{color: "black"}}>
                                            {item.name[language]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Preferred Dates */}
                    <div className="form-row">
                        <div className="form-label">
                            <label>{contactData.preferredDateLabel[language]}</label>
                            <span className="optional-badge">{contactData.optionalBadge[language]}</span>
                        </div>
                        <div className="form-input-group date-group">
                            <input type="datetime-local" name="preferred_date_1" title={language === 'en' ? '1st Choice' : '第1希望'} />
                            <input type="datetime-local" name="preferred_date_2" title={language === 'en' ? '2nd Choice' : '第2希望'} />
                            <p className="field-hint">
                                {contactData.dateHint[language]}
                            </p>
                        </div>
                    </div>
                    
                    {/* Message */}
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="message">{contactData.messageLabel[language]}</label>
                            <span className="required-badge">{contactData.requiredBadge[language]}</span>
                        </div>
                        <div className="form-input-group">
                            <textarea 
                                id="message" 
                                name="message"
                                ref={textareaRef}
                                rows="4" 
                                placeholder={contactData.messagePlaceholder[language]} 
                                required
                                onChange={handleInput} 
                                style={{ resize: 'vertical', overflow: 'hidden' }}
                            ></textarea>
                        </div>
                    </div>
                    
                    {/* Submit */}
                    <div className="form-submit-row">
                        <button type="submit" className="submit-btn" disabled={isSending}>
                            {isSending ? contactData.sendingBtn[language] : contactData.submitBtn[language]}
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default ContactForm;