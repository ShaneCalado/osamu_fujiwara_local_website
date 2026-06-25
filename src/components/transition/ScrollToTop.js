import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            const scrollWrappers = document.querySelectorAll(
                '.app-layout, .page-container, .category-page-wrapper, .prices-page-wrapper, .home-scroll-container'
            );
            
            scrollWrappers.forEach(wrapper => {
                wrapper.scrollTo({ top: 0, behavior: 'instant' });
            });
        }, 10);

    }, [pathname]); 

    return null; 
};

export default ScrollToTop;