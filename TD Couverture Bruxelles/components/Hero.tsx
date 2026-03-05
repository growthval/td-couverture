import React from 'react';
import { PHONE, PHONE_HREF } from '../constants';

const trackPhoneClick = () => {
    if (window.dataLayer) {
        window.dataLayer.push({ event: 'click_phone', location: 'hero_cta' });
    }
};

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative bg-[var(--color-primary)] text-white overflow-hidden"
            style={{ minHeight: '560px' }}
        >
            {/* Background image overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                role="img"
                aria-label="Couvreur TD Couverture travaillant sur un toit en ardoise à Bruxelles"
                style={{
                    backgroundImage: "url('/hero-background-16-9.webp')",
                    opacity: 0.35,
                }}
            />

            {/* Geometric accent lines (roof angle motif) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-[55%] h-full opacity-10"
                    style={{
                        background: 'linear-gradient(135deg, transparent 40%, rgba(211,84,0,0.6) 100%)',
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 opacity-20"
                    style={{ borderColor: 'var(--color-accent)' }}
                />
                <svg
                    className="absolute top-0 right-0 h-full opacity-5"
                    viewBox="0 0 600 560"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMaxYMid slice"
                >
                    <polygon points="0,0 600,0 600,560" fill="white" />
                </svg>
            </div>

            {/* Diagonal bottom cut */}
            <div
                className="absolute bottom-0 left-0 right-0 h-16 bg-white"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 pb-24 md:pb-32">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">

                    {/* Left content */}
                    <div className="lg:col-span-7 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">

                        {/* Location badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
                            <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-heading font-semibold tracking-widest uppercase text-white/90">
                                Bruxelles & Communes
                            </span>
                        </div>

                        {/* Main heading */}
                        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight tracking-tight">
                            Votre Couvreur-Charpentier{' '}
                            <span className="text-[var(--color-accent)]">de confiance</span>{' '}
                            à Bruxelles
                        </h1>

                        <p className="text-xl lg:text-2xl font-light mb-7 text-white/85 leading-relaxed">
                            +15 ans d'expérience.{' '}
                            <strong className="font-semibold text-white">
                                Couverture, charpente, maçonnerie & urgence toiture.
                            </strong>
                        </p>

                        {/* Feature list */}
                        <ul className="space-y-3 mb-9 text-base font-medium">
                            {[
                                'Ardoise, zinc, tuile, PVC, bac acier : pose et rénovation soignées.',
                                'Fuites, gouttières, faîtage, cheminée : diagnostic & réparation rapides.',
                                'Artisan certifié, assuré et couvert par garantie décennale.',
                                'Devis gratuit sous 24h — intervention prioritaire en urgence.',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-white/90">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <a
                                href="#simulateur"
                                className="btn-primary px-8 py-4 text-base text-center"
                            >
                                Devis Gratuit
                            </a>
                            <a
                                href={PHONE_HREF}
                                onClick={trackPhoneClick}
                                className="btn-urgent px-8 py-4 text-base text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {PHONE}
                            </a>
                        </div>
                    </div>

                    {/* Right: Photo + trust indicators */}
                    <div className="hidden lg:block lg:col-span-5 mt-8 lg:mt-0 scroll-reveal opacity-0 translate-y-5 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                        <div className="relative">
                            <img
                                src="/pose-par-pluie-toiture.jpeg"
                                alt="Artisan TD Couverture posant une membrane d'étanchéité Siplast sur un toit à Bruxelles"
                                className="rounded-lg shadow-2xl w-full h-auto object-cover"
                                loading="eager"
                                width="560"
                                height="420"
                            />
                            {/* Trust badge overlay */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl px-5 py-4 flex items-center gap-3">
                                <span className="text-3xl font-heading font-extrabold text-[var(--color-accent)]">+15</span>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-primary)] leading-tight">ans</p>
                                    <p className="text-xs text-gray-500 leading-tight">d'expérience</p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-[var(--color-accent)] text-white rounded-lg shadow-xl px-4 py-3 text-center">
                                <p className="text-xs font-heading font-bold uppercase tracking-wide">Garantie</p>
                                <p className="text-xl font-heading font-extrabold leading-none">10 ans</p>
                                <p className="text-xs font-semibold opacity-90">Décennale</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
