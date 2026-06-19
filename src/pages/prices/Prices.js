import React, { useEffect } from 'react';
import ContactBox from '../../components/contactBox/ContactBox';
import './Prices.css';

const PricesPage = ({ category, language }) => {
    // Scroll to the top when navigating to a new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    // Safety check
    if (!category) return null;

    // Filter out items that do not have the 'Include in price page' checkbox ticked
    const validPricingItems = category.items.filter(item => item.includeInPricePage === true);

    return (
        <div className="prices-page-wrapper">
            
            {/* Fallback Base Background */}
            <div className="prices-base-bg" />

            {/* Dynamic Background Image */}
            {category.bgImage && (
                <div 
                    className="prices-dynamic-bg"
                    style={{
                        backgroundImage: `linear-gradient(rgba(187, 182, 182, 0.6), rgba(15, 17, 21, 0.95)), url(/images/${category.bgImage})`
                    }}
                />
            )}

            <div className="prices-content-container">
                
                {/* Main Page Title */}
                <h1 className="prices-page-title">
                    {category.category[language]} - {language === 'en' ? 'Fee Schedule' : '報酬額表'}
                </h1>

                <div className="prices-glass-box">
                    
                    {/* Hero Image (Same logic as CategoryPage) */}
                    {category.image && (
                        <div className="prices-intro-section">
                            <div className="prices-hero-image-wrapper">
                                <img 
                                    src={`/images/${category.image}`} 
                                    alt={category.category[language]} 
                                />
                            </div>
                        </div>
                    )}

                    <div className="price-category-section">
                        <div className="prices-items-list">
                            
                            {/* Headers */}
                            <div className="prices-list-header">
                                <div className="header-name">{language === 'en' ? 'Service' : 'サービス名'}</div>
                                <div className="header-price">{language === 'en' ? 'Price (incl. tax)' : '報酬額（税込）'}</div>
                            </div>

                            {/* Service Rows */}
                            {validPricingItems.length > 0 ? (
                                validPricingItems.map((item, idx) => (
                                    <div key={idx} className="price-item-row">
                                        <div className="price-item-name">{item.name[language]}</div>
                                        <div className="price-item-value">{item.price}</div>
                                    </div>
                                ))
                            ) : (
                                /* Fallback if a category accidentally has no prices checked */
                                <div className="price-item-row">
                                    <div className="price-item-name">
                                        {language === 'en' ? 'Contact us for a quote.' : 'お見積りはお問い合わせください。'}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <ContactBox language={language} />
            
        </div>
    );
};

export default PricesPage;