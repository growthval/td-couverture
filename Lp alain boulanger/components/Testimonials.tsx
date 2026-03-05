import React, { useState, useEffect, useRef, useCallback } from 'react';
import { testimonials } from '../constants';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex justify-center mb-4 space-x-0.5">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.692h4.168c.969 0 1.371 1.24.588 1.83l-3.374 2.454a1 1 0 00-.363 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.374-2.454a1 1 0 00-1.175 0l-3.374 2.454c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.015 9.406c-.783-.59-.38-1.83.588-1.83h4.168a1 1 0 00.95-.692l1.286-3.957z"></path>
            </svg>
        ))}
    </div>
);

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerHeight, setContainerHeight] = useState<number | string>('auto');
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const updateHeight = useCallback(() => {
        if (cardRefs.current[currentIndex]) {
            setContainerHeight(cardRefs.current[currentIndex]!.offsetHeight);
        }
    }, [currentIndex]);
    
    useEffect(() => {
        // Set initial height
        updateHeight();
        window.addEventListener('resize', updateHeight);

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 7000);

        return () => {
            window.removeEventListener('resize', updateHeight);
            clearInterval(interval);
        };
    }, [updateHeight]);

    useEffect(() => {
      // Recalculate height whenever the current index changes
      updateHeight();
    }, [currentIndex, updateHeight]);

    const touchStartX = useRef<number | null>(null);

    const showTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    const prevTestimonial = () => {
        setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
    };

    const nextTestimonial = () => {
        setCurrentIndex((currentIndex + 1) % testimonials.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) {
            if (delta > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
        touchStartX.current = null;
    };

    return (
        <section className="py-16 sm:py-20 bg-[var(--color-primary)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                <h2 className="text-4xl font-extrabold mb-4">Ce que disent nos clients</h2>
                <p className="text-xl opacity-90 mb-10">La confiance de nos clients, notre meilleure garantie.</p>

                <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <div 
                        id="testimonial-carousel" 
                        className="relative"
                        style={{ height: containerHeight }}
                    >
                        {testimonials.map((testimonial, index) => (
                             <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                            >
                                <div
                                    ref={el => { cardRefs.current[index] = el; }}
                                    className="bg-white p-8 rounded-xl shadow-2xl text-gray-800 flex flex-col justify-between"
                                >
                                    <StarRating rating={testimonial.rating} />
                                    <p className="text-xl italic font-medium mb-6">« {testimonial.review} »</p>
                                    <div className="border-t pt-4 text-center">
                                        <strong className="text-lg text-[var(--color-primary)]">{testimonial.name}</strong>
                                        <span className="text-sm text-gray-500 block">{testimonial.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={prevTestimonial} className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 sm:-ml-10 p-3 bg-white text-[var(--color-primary)] rounded-full shadow-lg hover:bg-gray-200 transition duration-300 hidden md:block" aria-label="Avis précédent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button onClick={nextTestimonial} className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 sm:-mr-10 p-3 bg-white text-[var(--color-primary)] rounded-full shadow-lg hover:bg-gray-200 transition duration-300 hidden md:block" aria-label="Avis suivant">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
                
                <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => showTestimonial(index)} className={`w-3 h-3 rounded-full transition duration-300 ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`} aria-label={`Aller à l'avis ${index + 1}`}></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;