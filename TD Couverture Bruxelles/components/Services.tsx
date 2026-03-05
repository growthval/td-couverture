import React from 'react';

interface ServiceCardProps {
    title: string;
    description: string;
    serviceValue: string;
    delay: number;
    onServiceSelect: (serviceValue: string) => void;
    icon: React.ReactElement;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    serviceValue,
    delay,
    onServiceSelect,
    icon,
}) => (
    <div
        className="bg-white rounded-lg shadow-[0_2px_16px_rgba(44,62,80,0.08)] hover:shadow-[0_8px_32px_rgba(44,62,80,0.14)] transition-all duration-300 scroll-reveal opacity-0 translate-y-5 border border-gray-100 flex flex-col overflow-hidden card-lift cursor-pointer"
        style={{ transitionDelay: `${delay}ms` }}
        onClick={() => onServiceSelect(serviceValue)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onServiceSelect(serviceValue); }}
    >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-[var(--color-accent)]" />

        <div className="p-6 flex flex-col flex-1">
            <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-primary)] pt-1">{title}</h3>
            </div>
            <p
                className="text-gray-600 text-sm leading-relaxed flex-1 mb-5"
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <a
                href="#simulateur"
                onClick={(e) => { e.preventDefault(); onServiceSelect(serviceValue); }}
                className="inline-flex items-center gap-2 text-[var(--color-accent)] font-heading font-bold text-sm group mt-auto"
            >
                Obtenir une estimation
                <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
    </div>
);

const Services: React.FC<{ onServiceSelect: (serviceValue: string) => void }> = ({
    onServiceSelect,
}) => {
    const services = [
        {
            title: 'Couverture & Rénovation',
            description:
                'Pose, rénovation et réparation de toitures en <strong>ardoise, tuile, zinc, PVC ou bac acier</strong>. Travail soigné, matériaux certifiés, devis gratuit.',
            serviceValue: 'couverture',
            icon: (
                <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024578/roof_2_ma9ozg.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            ),
        },
        {
            title: 'Charpente',
            description:
                'Réparation, renforcement ou remplacement complet de charpente traditionnelle. <strong>Traitement fongicide et insecticide</strong> pour une longévité maximale.',
            serviceValue: 'charpente',
            icon: (
                <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/insulation_mcjrzm.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            ),
        },
        {
            title: 'Maçonnerie',
            description:
                '<strong>Réfection de faîtage ciment</strong>, réparation et étanchéité de cheminée, rejointoiement et travaux de maçonnerie liés à la toiture.',
            serviceValue: 'maconnerie',
            icon: (
                <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024423/roof_wtxuz8.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            ),
        },
        {
            title: 'Urgence Toiture',
            description:
                'Intervention rapide pour <strong>fuites, tempêtes, dégâts</strong>. Diagnostic précis sur place, réparation dans la journée. Disponible 7j/7 pour les urgences.',
            serviceValue: 'urgence',
            icon: (
                <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/improvement_cs3xol.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            ),
        },
        {
            title: 'Nettoyage & Démoussage',
            description:
                'Nettoyage haute pression, traitement <strong>anti-mousse et hydrofuge</strong>. Protégez votre toiture et préservez son étanchéité sur le long terme.',
            serviceValue: 'nettoyage',
            icon: (
                <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024530/eco_fishh8.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            ),
        },
        {
            title: 'Gouttières',
            description:
                'Pose et remplacement de <strong>gouttières en zinc, PVC ou aluminium</strong>. Réparation de descentes pluviales. Nettoyage et débouchage.',
            serviceValue: 'gouttieres',
            icon: (
                <img src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/roof_1_ilpnxk.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            ),
        },
    ];

    return (
        <section id="prestations" className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-primary)] mb-3">
                        Nos prestations à Bruxelles
                    </h2>
                    <div className="section-divider" />
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                        Couverture, charpente, maçonnerie, urgence : TD Couverture prend en charge tous vos travaux de toiture.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard
                            key={i}
                            {...service}
                            delay={i * 80}
                            onServiceSelect={onServiceSelect}
                        />
                    ))}
                </div>

                {/* Urgence CTA banner */}
                <div id="urgence" className="mt-12 bg-[var(--color-urgent)] rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 scroll-reveal opacity-0 translate-y-5 transition-all duration-700" style={{ transitionDelay: '500ms' }}>
                    <div className="text-white text-center md:text-left">
                        <p className="font-heading font-extrabold text-xl md:text-2xl">Urgence toiture ?</p>
                        <p className="opacity-90 mt-1">Fuite, tempête, dégâts — nous intervenons rapidement.</p>
                    </div>
                    <a
                        href="tel:+32485197479"
                        className="flex-shrink-0 bg-white text-[var(--color-urgent)] font-heading font-extrabold px-8 py-4 rounded text-base uppercase tracking-wide hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        0485 19 74 79
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
