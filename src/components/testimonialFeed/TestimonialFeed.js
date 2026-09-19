import React, { useState, useEffect, useRef } from 'react';
import './TestimonialFeed.css';

const TestimonialFeed = ({ language }) => {
    const [testimonialsData, setTestimonialsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);

    // 1. Fetch data from WordPress
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('https://office-fujiwaraosamu.com/cms/wp-json/wp/v2/testimonial?acf_format=standard');
                const wpPosts = await response.json();

                const formattedData = wpPosts.map((post) => {
                    return {
                        review_id: post.id.toString(),
                        review_text: {
                            en: typeof post.acf.full_text_en === 'string' ? post.acf.full_text_en : "",
                            ja: typeof post.acf.full_text_ja === 'string' ? post.acf.full_text_ja : ""
                        },
                        review_quote: {
                            en: typeof post.acf.short_quote_en === 'string' ? post.acf.short_quote_en : "",
                            ja: typeof post.acf.short_quote_ja === 'string' ? post.acf.short_quote_ja : ""
                        },
                        image: typeof post.acf.client_image === 'string' ? post.acf.client_image : "",
                        from_customer: !!post.acf.from_customer, // Grab the customer toggle from WP
                        date: post.acf.date || post.date
                    };
                });

                // Sort chronological (Oldest first)
                formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

                setTestimonialsData(formattedData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching testimonials feed:", error);
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // 2. Smooth Scroll Logic
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        
        if (!wrapper || !track || isLoading) return;

        let targetScroll = track.scrollLeft;
        let animationFrameId;
        let isAnimating = false;

        const smoothScroll = () => {
            track.scrollLeft += (targetScroll - track.scrollLeft) * 0.1;
            
            if (Math.abs(targetScroll - track.scrollLeft) > 1) {
                animationFrameId = requestAnimationFrame(smoothScroll);
            } else {
                track.scrollLeft = targetScroll; 
                isAnimating = false;
            }
        };

        const handleWheel = (e) => {
            if (window.innerWidth <= 768 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

            const maxScroll = track.scrollWidth - track.clientWidth;
            
            if ((track.scrollLeft <= 0 && e.deltaY < 0) || (Math.ceil(track.scrollLeft) >= maxScroll && e.deltaY > 0)) {
                return;
            }

            e.preventDefault(); 

            targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + e.deltaY * 2));

            if (!isAnimating) {
                isAnimating = true;
                animationFrameId = requestAnimationFrame(smoothScroll);
            }
        };

        const handleNativeScroll = () => {
            if (!isAnimating) targetScroll = track.scrollLeft;
        };

        wrapper.addEventListener('wheel', handleWheel, { passive: false });
        track.addEventListener('scroll', handleNativeScroll, { passive: true });
        
        return () => {
            wrapper.removeEventListener('wheel', handleWheel);
            track.removeEventListener('scroll', handleNativeScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLoading, testimonialsData]); 

    // 3. Render
    if (isLoading) {
        return (
            <div className="testimonial-feed-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'white' }}>
                {language === 'en' ? 'Loading testimonials...' : '読み込み中...'}
            </div>
        );
    }

    return (
        <div className="testimonial-feed-wrapper" ref={wrapperRef}>
            <div className="testimonial-scroll-track" ref={trackRef}>
                {testimonialsData.map((item) => {
                    
                    // Conditionally format the quote based on from_customer status
                    let formattedQuote = item.review_quote[language];
                    if (item.from_customer && formattedQuote) {
                        formattedQuote = language === 'ja' 
                            ? `「${formattedQuote}」` 
                            : `"${formattedQuote}"`;
                    }

                    return (
                        <div key={item.review_id} className="testimonial-feed-card">
                            
                            <h4 className="feed-quote">{formattedQuote}</h4>
                            
                            <div className="feed-body-wrapper">
                                {item.image && (
                                    <div className="feed-card-image">
                                        <img src={item.image} alt="Client" />
                                    </div>
                                )}
                                <p className="feed-text">{item.review_text[language]}</p>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TestimonialFeed;