import React, { useState } from 'react'; // Removed useEffect
import { Link } from 'react-router-dom'; 
import homeData from '../../data/home.json'; 
import servicesData from '../../data/services.json'; 
import './Home.css';

const Home = ({ language }) => {
    // Removed gifSrc state
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); 

    const validCategories = servicesData.filter(cat => cat.items && cat.items.length > 0);

    // Removed the useEffect timer that swapped the image

    const getImgSrc = (cat) => {
        const imgSrc = cat.image || cat.bgImage || cat.defaultServiceImage || 'headshot.jpg';
        return imgSrc.startsWith('http') ? imgSrc : `/images/${imgSrc}`;
    };

    return (
        <div className="home-scroll-container">
            
            {/* SECTION 0: WELCOME */}
            <section className="home-section welcome-section">
                <div className="intro-dashboard-container">
                    <div className="intro-row">
                        
                        {/* LEFT: The Large Text Box */}
                        <div className="intro-text-col">
                            <h2 className="welcome-header">{homeData?.welcomeHeader?.[language] || ""}</h2>
                            <h2 className="welcome-text" dangerouslySetInnerHTML={{ __html: homeData?.welcomeText?.[language] || "" }} />
                            <p className="welcome-subtext">{homeData?.welcomeSubText?.[language] || ""}</p>
                        </div>

                        {/* RIGHT: The Smaller Overlaid Image */}
                        <div className="intro-image-col">
                            {/* Hardcoded the static image right here */}
                            <img src="/images/bow_static.png" alt="Office Representative" />
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