import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 1. Reset standard window scroll
        window.scrollTo(0, 0);

        // 2. Reset your custom CSS scroll containers
        // We use a slight delay (10ms) to ensure Framer Motion has mounted the new page 
        // before we try to force the scroll containers back to the top.
        setTimeout(() => {
            const scrollWrappers = document.querySelectorAll(
                '.app-layout, .page-container, .category-page-wrapper, .prices-page-wrapper, .home-scroll-container'
            );
            
            scrollWrappers.forEach(wrapper => {
                wrapper.scrollTo({ top: 0, behavior: 'instant' });
            });
        }, 10);

    }, [pathname]); // This tells React to run this code EVERY time the URL changes

    return null; // This component doesn't render any visible HTML!
};

export default ScrollToTop;