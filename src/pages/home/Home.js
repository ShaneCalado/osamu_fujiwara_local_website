import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import homeData from '../../data/home.json'; 
import servicesData from '../../data/services.json'; 
import './Home.css';

const Home = ({ language }) => {
    const [gifSrc, setGifSrc] = useState("/images/bow_static.png"); 
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); 

    const validCategories = servicesData.filter(cat => cat.items && cat.items.length > 0);

    // Keep the timing effect for your GIF
    useEffect(() => {
        const timer = setTimeout(() => {
            setGifSrc(`/images/bow_anim.gif?t=${Date.now()}`);
        }, 3200);
        return () => clearTimeout(timer);
    }, []);

    const getImgSrc = (cat) => {
        const imgSrc = cat.image || cat.bgImage || cat.defaultServiceImage || 'headshot.jpg';
        return imgSrc.startsWith('http') ? imgSrc : `/images/${imgSrc}`;
    };

    return (
        <div className="home-scroll-container">
            
            {/* SECTION 0: WELCOME */}
            <section className="home-section welcome-section">
                <div className="content-wrapper locked-home-content">
                    <div className="welcome-grid-container">
                        <div className="grid-header">
                            <h2 className="welcome-header">{homeData?.welcomeHeader?.[language] || ""}</h2>
                        </div>
                        <div className="grid-text">
                            <h2 className="welcome-text" dangerouslySetInnerHTML={{ __html: homeData?.welcomeText?.[language] || "" }} />
                        </div>
                        <div className="grid-image">
                            <img src={gifSrc} alt="Office Representative" />
                        </div>
                        <div className="grid-subtext">
                            <p className="welcome-subtext">{homeData?.welcomeSubText?.[language] || ""}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: VIDEO */}
            <section className="home-section video-section">
                <div className="video-wrapper">
                    {!isVideoPlaying ? (
                        <div className="custom-play-overlay" onClick={() => setIsVideoPlaying(true)}>
                            <div className="play-button-circle">
                                <span className="play-triangle">▶</span>
                            </div>
                        </div>
                    ) : (
                        <iframe 
                            src="https://www.youtube.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1&controls=0&autoplay=1" 
                            title="Fujiwara Office Introduction" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </section>

            {/* SECTION 2: CATEGORIES DASHBOARD */}
            <section className="home-section categories-section">
                <div className="categories-dashboard-container">
                    {validCategories.length > 0 && (
                        <div className="category-row top-category-row">
                            <div className="cat-image-col">
                                <img src={getImgSrc(validCategories[0])} alt={validCategories[0].category[language]} />
                            </div>
                            <div className="cat-text-col">
                                <h3>{validCategories[0].category[language]}</h3>
                                <p>{validCategories[0].description[language]}</p>
                                <Link to="/services" className="cat-learn-more">
                                    {language === 'en' ? 'Learn More' : '詳細を見る'}
                                </Link>
                            </div>
                        </div>
                    )}

                    {validCategories.length > 1 && (
                        <div className="bottom-categories-row">
                            {validCategories.slice(1, 4).map((cat, index) => (
                                <div key={index} className="category-card-small">
                                    <div className="small-img-col">
                                        <img src={getImgSrc(cat)} alt={cat.category[language]} />
                                    </div>
                                    <div className="small-text-col">
                                        <h3>{cat.category[language]}</h3>
                                        <p>{cat.description[language]}</p>
                                        <Link to="/services" className="cat-learn-more small-btn">
                                            {language === 'en' ? 'Learn More' : '詳細を見る'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>


        </div> 
    );
};

export default Home;