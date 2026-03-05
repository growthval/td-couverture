import React, { useState, useEffect } from 'react';
import { PHONE, PHONE_HREF } from '../constants';

const AvailabilityBadge: React.FC = () => (
    <span className="inline-flex items-center bg-green-50 border border-green-200 py-1 px-3 rounded-full text-xs font-semibold text-green-700">
        <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 pulse-dot"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Disponible
    </span>
);

const trackPhoneClick = (location: string) => {
    if (window.dataLayer) {
        window.dataLayer.push({ event: 'click_phone', location });
    }
};

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white shadow-[0_2px_20px_rgba(44,62,80,0.12)] py-2'
                        : 'bg-white border-b border-gray-100 py-3'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="flex items-center flex-shrink-0">
                        <img
                            src="/logo.png"
                            alt="TD Couverture Bruxelles"
                            className="h-10 sm:h-12 w-auto object-contain"
                        />
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Intervention rapide — devis sous 24h
                            </p>
                            <div className="flex items-center gap-3">
                                <a
                                    href={PHONE_HREF}
                                    onClick={() => trackPhoneClick('header_desktop')}
                                    className="flex items-center gap-2 text-xl font-heading font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {PHONE}
                                </a>
                                <AvailabilityBadge />
                            </div>
                        </div>

                        <a
                            href="#simulateur"
                            className="btn-primary px-6 py-3 text-sm"
                        >
                            Devis Gratuit
                        </a>
                    </div>

                    {/* Mobile CTA */}
                    <div className="md:hidden">
                        <a href="#simulateur" className="btn-primary px-4 py-2 text-xs">
                            Devis Gratuit
                        </a>
                    </div>
                </div>
            </header>

            {/* Mobile sticky bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-2 p-3 bg-white z-50 shadow-[0_-4px_16px_rgba(44,62,80,0.1)]">
                <a
                    href={PHONE_HREF}
                    onClick={() => trackPhoneClick('sticky_mobile')}
                    className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-heading font-bold text-sm py-3 rounded"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Appeler
                </a>
                <a
                    href="#simulateur"
                    className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm py-3"
                >
                    Devis Gratuit
                </a>
            </div>
        </>
    );
};

export default Header;
