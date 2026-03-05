import React from 'react';

const Hero: React.FC = () => {
    const trackPhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'click_phone',
                location: 'hero_cta'
            });
        }
    };

    return (
        <section id="hero" className="relative bg-[var(--color-primary)] text-white py-12 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://res.cloudinary.com/dbnnymu2g/image/upload/v1762933840/6613721_gmn54r.webp')" }}></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                    
                    <div className="lg:col-span-7 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                            Votre Couvreur-charpentier expérimenté en <span className="text-[var(--color-accent)]">Seine-Saint-Denis</span> & <span className="text-[var(--color-accent)]">Val-de-Marne.</span>
                        </h1>
                        <p className="text-xl lg:text-2xl font-light mb-6">
                            +15 ans d’expérience. <strong className="font-semibold">Couverture, zinguerie, charpente, nettoyage & démoussage, Vélux / Isolation</strong>.
                        </p>

                        <ul className="space-y-3 mb-8 text-lg font-medium">
                            {[
                                "Matériaux conformes aux normes européennes.",
                                "Fuites, gouttières, faîtage, cheminée : diagnostic & réparation rapides.",
                                "Isolation (laine de roche, laine de verre, coton) : confort et économies d’énergie.",
                                "Ardoise, zinc, PVC, bac acier, tuiles anciennes : pose et rénovation soignées."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="w-6 h-6 mr-3 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        
                        <div className="flex flex-col space-y-4 md:items-start">
                            <a href="#simulateur" className="transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl hover:-translate-y-1 max-w-sm w-full bg-[var(--color-accent)] text-white uppercase font-extrabold px-6 py-3 rounded-lg text-base flex justify-center md:justify-start">
                                Réaliser mon estimation
                            </a>
                             <a 
                                href="tel:0185536082" 
                                onClick={trackPhoneClick}
                                className="transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl hover:-translate-y-1 max-w-sm w-full bg-white text-[var(--color-primary)] uppercase font-bold px-6 py-3 rounded-lg text-base flex items-center justify-center md:justify-start"
                            >
                                <span className="mr-3">Appeler maintenant</span>
                                <span className="inline-flex items-center bg-[#E8F5E9] py-1 px-3 rounded-full text-xs font-semibold text-[#388E3C]">
                                    <span className="block w-2 h-2 mr-1.5 rounded-full bg-[#4CAF50]"></span>
                                    Disponible
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 hidden lg:block mt-8 lg:mt-0 scroll-reveal opacity-0 translate-y-5 transition-all duration-700 delay-200">
                        <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1762933470/WhatsApp-Image-2024-11-20-at-14.33.27-8_1_paflcm.webp" alt="Artisan couvreur travaillant sur un toit" className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;