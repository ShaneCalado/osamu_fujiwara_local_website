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

        // The high-performance smoothing function
        const smoothScroll = () => {
            // Glides the track 10% of the remaining distance every frame
            track.scrollLeft += (targetScroll - track.scrollLeft) * 0.1;
            
            // Keep animating until we are within 1 pixel of the target
            if (Math.abs(targetScroll - track.scrollLeft) > 1) {
                animationFrameId = requestAnimationFrame(smoothScroll);
            } else {
                track.scrollLeft = targetScroll; // Snap to exact target
                isAnimating = false;
            }
        };

        const handleWheel = (e) => {
            // Ignore on mobile, or if using a horizontal trackpad swipe
            if (window.innerWidth <= 768 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

            const maxScroll = track.scrollWidth - track.clientWidth;
            
            // If already at the very edge, let the page scroll vertically
            if ((track.scrollLeft <= 0 && e.deltaY < 0) || (Math.ceil(track.scrollLeft) >= maxScroll && e.deltaY > 0)) {
                return;
            }

            e.preventDefault(); // Stop vertical page jump

            // Update the target destination (multiplied by 2 for snappy response)
            targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + e.deltaY * 2));

            // Start the glide animation if it isn't already running
            if (!isAnimating) {
                isAnimating = true;
                animationFrameId = requestAnimationFrame(smoothScroll);
            }
        };

        // Keep the target in sync if the user manually drags the scrollbar
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