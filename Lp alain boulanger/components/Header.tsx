import React, { useState, useEffect } from 'react';

const AvailabilityPill: React.FC<{ simple?: boolean }> = ({ simple = false }) => {
    if (simple) {
        return (
             <span className="inline-flex items-center bg-[#E8F5E9] py-1 px-3 rounded-full text-sm font-semibold text-[#388E3C]">
                <span className="block w-2 h-2 mr-1.5 rounded-full bg-[#4CAF50]"></span>
                Disponible
            </span>
        )
    }
    return (
        <span className="inline-flex items-center bg-[#E8F5E9] py-1 px-3 rounded-full text-sm font-semibold text-[#388E3C]">
            <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponible
        </span>
    );
};

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const trackPhoneClick = (location: string) => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'click_phone',
                location: location
            });
        }
    };

    return (
        <>
            <header className={`fixed top-0 left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img 
                            src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1762931017/Alain-Boulanger-Toiture-LOGO_vre1jj.png" 
                            alt="Alain Boulanger Toiture Logo" 
                            className="h-10 sm:h-12 w-auto object-contain"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="text-right flex flex-col items-end">
                            <p className="text-xs font-semibold text-gray-500 uppercase">Intervention rapide — réponse sous 24 h</p>
                            <div className="flex items-center space-x-4 mt-1">
                                <a 
                                    href="tel:0185536082" 
                                    className="text-xl font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition duration-150 flex items-center"
                                    onClick={() => trackPhoneClick('header_desktop')}
                                >
                                    <svg className="w-6 h-6 mr-2 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    01 85 53 60 82
                                </a>
                                <AvailabilityPill simple />
                            </div>
                        </div>
                        <a href="#simulateur" className="transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-[var(--color-accent)] text-white uppercase font-bold px-6 py-3 rounded-lg text-sm">
                            Réaliser mon estimation
                        </a>
                    </div>

                    <div className="md:hidden">
                        <a href="#simulateur" className="bg-[var(--color-accent)] text-white uppercase font-bold px-4 py-2 rounded-lg text-xs shadow-lg">Estimation</a>
                    </div>
                </div>
            </header>

            <div className="fixed bottom-0 left-0 right-0 md:hidden flex justify-between p-3 bg-white z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <a 
                    href="tel:0185536082" 
                    className="flex-1 text-center bg-[var(--color-primary)] text-white uppercase font-bold px-3 py-3 rounded-lg mr-2 text-sm shadow-xl flex items-center justify-center"
                    onClick={() => trackPhoneClick('sticky_mobile')}
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Appeler
                </a>
                <a href="#simulateur" className="flex-1 text-center bg-[var(--color-accent)] text-white uppercase font-bold px-3 py-3 rounded-lg text-sm shadow-xl flex items-center justify-center">
                    📋 Estimation Gratuite
                </a>
            </div>
        </>
    );
};

export default Header;