import React, { useEffect, useRef } from 'react';
import testimonialsData from '../../data/testimonials.json';
import './TestimonialFeed.css';

const TestimonialFeed = ({ language }) => {
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track) return;

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
    }, []);

    return (
        <div className="testimonial-feed-wrapper" ref={wrapperRef}>

            <div className="testimonial-scroll-track" ref={trackRef}>
                {testimonialsData.map((item) => (
                    <div key={item.review_id} className="testimonial-feed-card">
                        
                        <h4 className="feed-quote">"{item.review_quote[language]}"</h4>
                        
                        <div className="feed-body-wrapper">
                            {item.image && (
                                <div className="feed-card-image">
                                    <img src={`/images/client_photos/${item.image}`} alt="Client" />
                                </div>
                            )}
                            <p className="feed-text">{item.review_text[language]}</p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default TestimonialFeed;