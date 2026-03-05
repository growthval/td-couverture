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

    const handleMove = useCallback((clientX: number) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    }, [isDragging]);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = useCallback(() => setIsDragging(false), []);
    const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
    
    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = useCallback(() => setIsDragging(false), []);
    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    }, [handleMove, isDragging]);

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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <div ref={containerRef} className="relative w-full aspect-[4/3] select-none">
                <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${afterImg})` }}
                >
                     <span className="absolute bottom-0 right-0 py-2 px-4 text-sm font-bold text-white bg-blue-800/80 rounded-tl-xl z-10">APRÈS</span>
                </div>
                <div 
                    className="absolute top-0 left-0 h-full bg-cover bg-center rounded-xl overflow-hidden"
                    style={{ backgroundImage: `url(${beforeImg})`, width: `${sliderPosition}%` }}
                >
                     <span className="absolute bottom-0 left-0 py-2 px-4 text-sm font-bold text-white bg-red-700/80 rounded-tr-xl z-10">AVANT</span>
                </div>
                <div 
                    className="absolute top-0 h-full w-1 bg-white cursor-grab z-20 shadow-lg"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#003366] text-white rounded-full flex items-center justify-center text-lg font-mono transform -translate-x-1/2 -translate-y-1/2 shadow-md">
                        ↔
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            </div>
        </div>
    );
};


const BeforeAfter: React.FC = () => {
    const comparisons = [
        {
            title: "Rénovation Complète de Toiture",
            beforeImg: "https://res.cloudinary.com/dbnnymu2g/image/upload/v1762930997/avant_reno_toit_ohraqc.webp",
            afterImg: "https://res.cloudinary.com/dbnnymu2g/image/upload/v1762930997/apr%C3%A8s_reno_toit_i72sli.webp"
        },
        {
            title: "Nettoyage et Démoussage Expert",
            beforeImg: "https://res.cloudinary.com/dbnnymu2g/image/upload/v1762930997/avant_toiture_sale_2_rjblpc.webp",
            afterImg: "https://res.cloudinary.com/dbnnymu2g/image/upload/v1762930998/apr%C3%A8s_toiture_propre_2_mk3mkq.webp"
        },
        {
            title: "Assainissement et Hydrofugation",
            beforeImg: "https://res.cloudinary.com/dbnnymu2g/image/upload/v1762930997/avant_toiture_sale_fmvgy0.webp",
            afterImg: "https://res.cloudinary.com/dbnnymu2g/image/upload/v1762930998/apr%C3%A8s_toiture_propre_v7gmnn.webp"
        },
    ];

    return (
        <section id="avant-apres" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003366]">
                        Nos réalisations parlent d'elles-mêmes
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Faites glisser le curseur pour comparer nos interventions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {comparisons.map((comp, index) => (
                        <ImageComparison key={index} {...comp} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
