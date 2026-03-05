import React, { useState, useEffect, useRef, useCallback } from 'react';
import { testimonials } from '../constants';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex justify-center gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.692h4.168c.969 0 1.371 1.24.588 1.83l-3.374 2.454a1 1 0 00-.363 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.374-2.454a1 1 0 00-1.175 0l-3.374 2.454c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.015 9.406c-.783-.59-.38-1.83.588-1.83h4.168a1 1 0 00.95-.692l1.286-3.957z" />
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
        updateHeight();
        window.addEventListener('resize', updateHeight);
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 7000);
        return () => {
            window.removeEventListener('resize', updateHeight);
            clearInterval(interval);
        };
    }, [updateHeight]);

    useEffect(() => {
        updateHeight();
    }, [currentIndex, updateHeight]);

    return (
        <section className="bg-[var(--color-primary)] py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-3">
                    Ce que disent nos clients
                </h2>
                <div className="section-divider" style={{ background: 'var(--color-accent)' }} />
                <p className="text-white/80 mt-4 mb-12 text-lg">
                    La satisfaction de nos clients à Bruxelles, notre meilleure référence.
                </p>

                {/* Google rating badge */}
                <div className="flex justify-center gap-6 mb-10">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.692h4.168c.969 0 1.371 1.24.588 1.83l-3.374 2.454a1 1 0 00-.363 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.374-2.454a1 1 0 00-1.175 0l-3.374 2.454c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.015 9.406c-.783-.59-.38-1.83.588-1.83h4.168a1 1 0 00.95-.692l1.286-3.957z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-white font-heading font-bold text-sm">5.0 / 5</span>
                        <span className="text-white/60 text-xs">Google Reviews</span>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div
                        className="relative transition-[height] duration-500 ease-in-out"
                        style={{ height: containerHeight }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                                    index === currentIndex
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                            >
                                <div
                                    ref={(el) => { cardRefs.current[index] = el; }}
                                    className="bg-white p-8 rounded-lg shadow-2xl text-gray-800 text-left"
                                >
                                    <StarRating rating={testimonial.rating} />
                                    <p className="text-lg italic text-gray-700 mb-6 leading-relaxed text-center">
                                        « {testimonial.review} »
                                    </p>
                                    <div className="border-t pt-4 text-center">
                                        <strong className="text-base font-heading font-bold text-[var(--color-primary)]">
                                            {testimonial.name}
                                        </strong>
                                        <span className="text-sm text-gray-500 block mt-0.5">
                                            {testimonial.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Nav arrows */}
                    <button
                        onClick={() => setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 sm:-ml-10 p-3 bg-white text-[var(--color-primary)] rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 hidden md:block"
                        aria-label="Avis précédent"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentIndex((currentIndex + 1) % testimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 sm:-mr-10 p-3 bg-white text-[var(--color-primary)] rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 hidden md:block"
                        aria-label="Avis suivant"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === currentIndex
                                    ? 'w-6 h-2.5 bg-[var(--color-accent)]'
                                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Avis ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
