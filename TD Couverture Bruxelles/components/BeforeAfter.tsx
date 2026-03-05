import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageComparisonProps {
    beforeImg: string;
    afterImg: string;
    title: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImg, afterImg, title }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
        (clientX: number) => {
            if (!isDragging || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            setSliderPosition((x / rect.width) * 100);
        },
        [isDragging],
    );

    const handleMouseUp = useCallback(() => setIsDragging(false), []);
    const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
    const handleTouchEnd = useCallback(() => setIsDragging(false), []);
    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            if (e.touches.length > 0) handleMove(e.touches[0].clientX);
        },
        [handleMove, isDragging],
    );

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handleMouseUp, handleMouseMove, handleTouchEnd, handleTouchMove]);

    return (
        <div className="rounded-lg shadow-[0_4px_24px_rgba(44,62,80,0.1)] overflow-hidden card-lift">
            <div
                ref={containerRef}
                className="relative w-full aspect-[4/3] select-none"
            >
                {/* After (background) */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    role="img"
                    aria-label={`Après intervention : ${title}`}
                    style={{ backgroundImage: `url(${afterImg})` }}
                >
                    <span className="absolute bottom-3 right-3 py-1.5 px-3 text-xs font-heading font-bold text-white bg-[var(--color-primary)]/90 rounded">
                        APRÈS
                    </span>
                </div>

                {/* Before (clipped) */}
                <div
                    className="absolute top-0 left-0 h-full bg-cover bg-center overflow-hidden"
                    role="img"
                    aria-label={`Avant intervention : ${title}`}
                    style={{ backgroundImage: `url(${beforeImg})`, width: `${sliderPosition}%` }}
                >
                    <span className="absolute bottom-3 left-3 py-1.5 px-3 text-xs font-heading font-bold text-white bg-[var(--color-urgent)]/90 rounded">
                        AVANT
                    </span>
                </div>

                {/* Slider handle */}
                <div
                    className="absolute top-0 h-full w-0.5 bg-white/90 cursor-grab z-20 shadow-lg"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                    onMouseDown={() => setIsDragging(true)}
                    onTouchStart={() => setIsDragging(true)}
                >
                    <div className="absolute top-1/2 left-1/2 w-9 h-9 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-md font-bold text-sm">
                        ↔
                    </div>
                </div>
            </div>

            <div className="bg-white px-5 py-4">
                <h3 className="font-heading font-semibold text-[var(--color-primary)]">{title}</h3>
            </div>
        </div>
    );
};

const BeforeAfter: React.FC = () => {
    const comparisons = [
        {
            title: 'Rénovation complète de toiture en ardoise',
            beforeImg: '/av-reno-toiture.webp',
            afterImg: '/ap-reno-toiture.webp',
        },
        {
            title: 'Nettoyage et démoussage professionnel',
            beforeImg: '/av-demoussage-toiture.webp',
            afterImg: '/ap-demoussage-toiture.png',
        },
        {
            title: 'Réfection de gouttières et faîtage',
            beforeImg: '/av-goutiere-faitage.webp',
            afterImg: '/ap-goutiere-faitage.webp',
        },
    ];

    return (
        <section id="realisations" className="bg-[var(--color-bg-section)] py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-primary)] mb-3">
                        Nos réalisations parlent d'elles-mêmes
                    </h2>
                    <div className="section-divider" />
                    <p className="text-gray-600 mt-4">
                        Faites glisser le curseur pour comparer avant / après nos interventions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {comparisons.map((comp, i) => (
                        <div
                            key={i}
                            className="scroll-reveal opacity-0 translate-y-5 transition-all duration-700"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <ImageComparison {...comp} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
