import React, { useEffect } from 'react';
import ContactBox from '../../components/contactBox/ContactBox';
import './Category.css';

const CategoryPage = ({ category, language }) => {
    // Scroll to the top when navigating to a new category page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    // Safety check: if no category is passed, don't render
    if (!category) return null;

    return (
        <div className="category-page-wrapper">
            
            {/* Dynamic Background Image */}
            {category.bgImage && (
                <div 
                    className="category-dynamic-bg"
                    style={{
                        backgroundImage: `linear-gradient(rgba(187, 182, 182, 0.6), rgba(15, 17, 21, 0.95)), url(/images/${category.bgImage})`
                    }}
                />
            )}

            <div className="category-content-container">
                
                {/* Main Page Title */}
                <h1 className="category-page-title">{category.category[language]}</h1>

                {/* The Glass Container */}
                <div className="category-glass-box">
                    
                    {/* Hero Image & Main Description */}
                    {(category.image || category.description?.[language]) && (
                        <div className="category-intro-section">
                            {category.image && (
                                <div className="category-hero-image-wrapper">
                                    <img 
                                        src={`/images/${category.image}`} 
                                        alt={category.category[language]} 
                                    />
                                </div>
                            )}
                            {category.description?.[language] && (
                                <p className="category-main-description">
                                    {category.description[language]}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Services List (Grid Layout) */}
                    <div className="category-items-list">
                        
                        {/* Headers */}
                        <div className="items-list-header">
                            <div className="header-name">{language === 'en' ? 'Service' : 'サービス名'}</div>
                            <div className="header-desc">{language === 'en' ? 'Description' : '内容'}</div>
                        </div>

                        {/* Service Rows */}
                        {category.items.map((item, idx) => (
                            <div key={idx} className="item-row">
                                <div className="item-name">{item.name[language]}</div>
                                <div className="item-desc">{item.description[language]}</div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* The Full-Bleed Footer */}
            <ContactBox language={language} />
            
        </div>
    );
};

export default CategoryPage;