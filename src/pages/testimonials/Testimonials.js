import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import servicesData from '../../data/services.json'; 
import './Testimonials.css';
import ContactBox from '../../components/contactBox/ContactBox'

const pageVariants = {
	hidden: { opacity: 0 },
	visible: { 
		opacity: 1, 
		transition: { staggerChildren: 0.1 } 
	}
};

const TestimonialAccordion = ({ item, language, idx, openIndex, toggleAccordion }) => {
	const isOpen = openIndex === idx;
	const accordionRef = useRef(null);
	
	useEffect(() => {
		if (isOpen && accordionRef.current) {
			setTimeout(() => {
				accordionRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 150); 
		}
	}, [isOpen]);

	const badgeText = item.from_customer 
		? (language === 'en' ? 'Testimonial' : 'お客様の声')
		: (language === 'en' ? 'Case Study' : '解決事例');

	const customTag = item.tag?.[language];

	let formattedQuote = item.review_quote[language];
	if (item.from_customer && formattedQuote) {
		formattedQuote = language === 'ja' 
			? `「${formattedQuote}」` 
			: `"${formattedQuote}"`;
	} 

	return (
		<motion.div 
			ref={accordionRef}
			layout 
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className={`testimonial-accordion box-style-b ${isOpen ? 'is-open' : ''}`}
		>
			<div className="accordion-header" onClick={() => toggleAccordion(idx)}>
				
				<div className="header-left-group">
					<span className={`testimonial-quote ${isOpen ? 'quote-open' : ''}`}>
						{formattedQuote}
					</span>
				</div>

				<div className="header-right-group">
					<div className="badge-wrapper">
						{customTag && customTag !== "-" && (
							<span className="testimonial-badge badge-category">
								{customTag}
							</span>
						)}
						<span className={`testimonial-badge ${item.from_customer ? 'badge-client' : 'badge-partner'}`}>
							{badgeText}
						</span>
					</div>
					
					<span className={`dropdown-icon ${isOpen ? 'rotated' : ''}`}>▾</span>
				</div>

			</div>
			
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div 
						key="content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
						className="accordion-content-wrapper"
						style={{ overflow: "hidden" }}
					>
						<div className="accordion-content-inner">
							
							{item.image && (
								<img 
									className="testimonial-body-avatar"
									src={item.image} 
									alt="Client"
								/>
							)}
							
							<p className="testimonial-full-text">
								{item.review_text[language]?.split('\n').map((line, index) => (
									<React.Fragment key={index}>
										{line}
										<br />
									</React.Fragment>
								))}
							</p>
							
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

const TestimonialsPage = ({ language }) => {
	const [openIndex, setOpenIndex] = useState(null); 
	const [testimonialsData, setTestimonialsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				// acf_format=standard forces WP to output the image URL instead of the ID number
				const response = await fetch('https://office-fujiwaraosamu.com/cms/wp-json/wp/v2/testimonial?acf_format=standard');
				const wpPosts = await response.json();

				const formattedData = wpPosts.map((post) => {
					// Parse comma-separated service IDs into an array safely
					const rawTag = typeof post.acf.tag === 'string' ? post.acf.tag : "";
					const splitTags = rawTag.split('/')

					return {
						review_id: post.id.toString(),
						tag: {
        					en: splitTags[0]?.trim() || "",
        					ja: splitTags[1]?.trim() || splitTags[0]?.trim() || "" 
    					},
						review_text: {
							en: typeof post.acf.full_text_en === 'string' ? post.acf.full_text_en : "",
							ja: typeof post.acf.full_text_ja === 'string' ? post.acf.full_text_ja : ""
						},
						review_quote: {
							en: typeof post.acf.short_quote_en === 'string' ? post.acf.short_quote_en : "",
							ja: typeof post.acf.short_quote_ja === 'string' ? post.acf.short_quote_ja : ""
						},
						image: typeof post.acf.client_image === 'string' ? post.acf.client_image : "",
						from_customer: !!post.acf.from_customer,
						date: post.acf.date || post.date
					};
				});

				// Preload client images to prevent flickering
				formattedData.forEach((item) => {
					if (item.image) {
						const img = new Image();
						img.src = item.image;
					}
				});

				setTestimonialsData(formattedData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching testimonials from WordPress:", error);
				setIsLoading(false);
			}
		};

		fetchTestimonials();
	}, []);

	const toggleAccordion = (idx) => setOpenIndex(openIndex === idx ? null : idx);

	const activeTestimonial = openIndex !== null ? testimonialsData[openIndex] : null;
	let activeBgImage = null;

	// Background image lookup using the service_ids mapped from WordPress against your local services.json
	if (activeTestimonial?.service_ids?.length > 0) {
		const targetServiceId = activeTestimonial.service_ids[0];
		
		for (const group of servicesData) {
			const foundService = group.items.find(item => item.id === targetServiceId);
			if (foundService && group.bgImage) {
				activeBgImage = group.bgImage;
				break;
			}
		}
	}

	return (
		<motion.div 
			className="testimonials-page-container"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="testimonials-base-bg"></div>

			<AnimatePresence>
				{activeBgImage && (
					<motion.div
						key={activeBgImage}
						className="testimonials-dynamic-bg"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
						style={{
							backgroundImage: activeBgImage.startsWith('http')
								? `linear-gradient(rgba(187, 182, 182, 0.6), rgba(15, 17, 21, 0.8)), url(${activeBgImage})`
								: `linear-gradient(rgba(187, 182, 182, 0.6), rgba(15, 17, 21, 0.8)), url(/images/${activeBgImage})`
						}}
					/>
				)}
			</AnimatePresence>

			<div className="testimonials-content-wrapper">
				
				<h1 className="testimonials-page-title">
					{language === 'en' ? 'Customer Testimonials / Case Studies' : 'お客様の声／解決事例'}
				</h1>
				
				<AnimatePresence initial={false}>
					{openIndex === null && (
						<motion.div
							className="header-wrapper" 
							initial={{ height: 0, opacity: 0, marginBottom: 0 }}
							animate={{ height: "auto", opacity: 1, marginBottom: 15 }}
							exit={{ height: 0, opacity: 0, marginBottom: 0 }}
							transition={{ duration: 0.35, ease: "easeInOut" }}
							style={{ overflow: "hidden" }}
						>
						</motion.div>
					)}
				</AnimatePresence>
				
				{isLoading ? (
					<div style={{ color: "white", textAlign: "center", padding: "40px" }}>
						{language === 'en' ? 'Loading testimonials...' : '読み込み中...'}
					</div>
				) : (
					<motion.div layout className="testimonials-accordion-scroll-box">
						{testimonialsData.map((item, idx) => (
							<TestimonialAccordion 
								key={item.review_id || idx} 
								item={item} 
								language={language} 
								idx={idx}
								openIndex={openIndex}
								toggleAccordion={toggleAccordion}
							/>
						))}
					</motion.div>
				)}

			</div>

			<ContactBox language={language} />
			
		</motion.div>
	);
};

export default TestimonialsPage;