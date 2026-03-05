import React from 'react';

const communes = [
    'Bruxelles-Ville', 'Ixelles', 'Uccle', 'Etterbeek', 'Schaerbeek',
    'Anderlecht', 'Molenbeek-Saint-Jean', 'Forest', 'Saint-Gilles',
    'Laeken / Neder-Over-Heembeek', 'Jette', 'Koekelberg',
    'Berchem-Sainte-Agathe', 'Ganshoren', 'Evere',
    'Watermael-Boitsfort', 'Woluwe-Saint-Lambert', 'Woluwe-Saint-Pierre',
    'Auderghem', 'Saint-Josse-ten-Noode',
];

const InterventionZone: React.FC = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-primary)] mb-3">
                        Zone d'intervention à Bruxelles
                    </h2>
                    <div className="section-divider" />
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                        TD Couverture intervient dans toutes les communes de la{' '}
                        <strong>Région de Bruxelles-Capitale</strong> et alentours.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Map */}
                    <div className="scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                        <div className="rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(44,62,80,0.1)]">
                            <img
                                src="/maps-zone-intervention.webp"
                                alt="Carte illustrée des 19 communes de la Région de Bruxelles-Capitale couvertes par TD Couverture : Bruxelles-Ville, Ixelles, Anderlecht, Schaerbeek, Molenbeek-Saint-Jean, Uccle, Forest, Saint-Gilles, Jette, Etterbeek, Evere, Koekelberg, Woluwe-Saint-Lambert, Woluwe-Saint-Pierre, Auderghem, Watermael-Boitsfort, Ganshoren, Berchem-Sainte-Agathe, Haren"
                                className="w-full h-auto object-contain"
                                width="640"
                                height="427"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm font-semibold text-[var(--color-urgent)] flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Urgence : intervention dans la journée sur toute la région
                            </p>
                        </div>
                    </div>

                    {/* Commune list */}
                    <div className="scroll-reveal opacity-0 translate-y-5 transition-all duration-700" style={{ transitionDelay: '150ms' }}>
                        <div className="bg-[var(--color-bg-section)] rounded-lg p-6 md:p-8">
                            <h3 className="font-heading font-bold text-[var(--color-primary)] text-lg mb-5 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Communes desservies
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                                {communes.map((commune, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {commune}
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-5">
                                <p className="text-sm text-gray-600 mb-4">
                                    Vous ne voyez pas votre commune ?{' '}
                                    <strong className="text-[var(--color-primary)]">Contactez-nous</strong>,
                                    nous intervenons également dans les zones périphériques.
                                </p>

                                {/* Trust elements */}
                                <div className="space-y-3">
                                    {[
                                        { icon: '⚡', text: 'Réponse immédiate' },
                                        { icon: '📋', text: 'Devis gratuit et sans engagement sous 24h' },
                                        { icon: '🛡️', text: 'Garantie décennale sur tous les travaux' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row gap-3">
                            <a
                                href="#simulateur"
                                className="btn-primary flex-1 text-center py-3 text-sm"
                            >
                                Devis Gratuit
                            </a>
                            <a
                                href="tel:+32485197479"
                                className="btn-urgent flex-1 text-center py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Urgence Couverture
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InterventionZone;
