import React, { useState, useEffect } from 'react';
import { legalContent, PHONE, PHONE_HREF } from '../constants';

const LegalModal: React.FC<{ onClose: () => void }> = ({
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        >
            <div
                className={`bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors duration-150"
                    aria-label="Fermer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div
                    className="prose max-w-none text-gray-700 pr-4"
                    dangerouslySetInnerHTML={{ __html: legalContent }}
                />
            </div>
        </div>
    );
};

const trackPhoneClick = (location: string) => {
    if (window.dataLayer) {
        window.dataLayer.push({ event: 'click_phone', location });
    }
};

const Footer: React.FC = () => {
    const [showLegal, setShowLegal] = useState(false);

    return (
        <>
            <footer className="bg-[var(--color-primary)] text-white">
                {/* Top section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid md:grid-cols-3 gap-10 md:gap-12">
                        {/* Brand column */}
                        <div>
                            <img
                                src="/logo.png"
                                alt="TD Couverture Bruxelles"
                                className="h-12 w-auto object-contain mb-4 brightness-0 invert"
                            />
                            <p className="text-white/70 text-sm leading-relaxed">
                                Artisan couvreur-charpentier certifié à Bruxelles.
                                +15 ans d'expérience au service de la région bruxelloise.
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    Disponible
                                </span>
                                <span className="text-white/50 text-xs">Lun – Sam, 7h–19h</span>
                            </div>
                        </div>

                        {/* Services column */}
                        <div>
                            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--color-accent)] mb-4">
                                Prestations
                            </h4>
                            <ul className="space-y-2 text-sm text-white/70">
                                {[
                                    'Couverture & Rénovation',
                                    'Charpente',
                                    'Maçonnerie',
                                    'Urgence Toiture',
                                    'Nettoyage & Démoussage',
                                    'Gouttières',
                                ].map((s) => (
                                    <li key={s} className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact column */}
                        <div>
                            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--color-accent)] mb-4">
                                Contact
                            </h4>
                            <div className="space-y-4">
                                <a
                                    href={PHONE_HREF}
                                    onClick={() => trackPhoneClick('footer')}
                                    className="flex items-center gap-3 text-white hover:text-[var(--color-accent)] transition-colors duration-200 group"
                                >
                                    <div className="w-9 h-9 rounded bg-white/10 group-hover:bg-[var(--color-accent)]/20 flex items-center justify-center transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span className="font-heading font-bold text-lg">{PHONE}</span>
                                </a>

                                <div className="flex items-center gap-3 text-white/70 text-sm">
                                    <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span>Région de Bruxelles-Capitale & communes</span>
                                </div>


                                <a
                                    href="#simulateur"
                                    className="btn-primary block text-center py-3 text-sm mt-4"
                                >
                                    Devis Gratuit
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                        <p>© {new Date().getFullYear()} TD Couverture Bruxelles — Tous droits réservés</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowLegal(true)}
                                className="underline hover:text-white transition-colors duration-150"
                            >
                                Mentions légales
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {showLegal && (
                <LegalModal onClose={() => setShowLegal(false)} />
            )}
        </>
    );
};

export default Footer;
