import React from 'react';

interface ServiceCardProps {
    title: string;
    description: string;
    serviceValue: string;
    delay: number;
    onServiceSelect: (serviceValue: string) => void;
    icon: React.ReactElement;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, serviceValue, delay, onServiceSelect, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 scroll-reveal opacity-0 translate-y-5 flex flex-col justify-between" style={{ transitionDelay: `${delay}ms` }}>
        <div>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 flex items-center">
                {icon}
                {title}
            </h3>
            <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <a 
            href="#simulateur" 
            data-service={serviceValue} 
            onClick={(e) => { e.preventDefault(); onServiceSelect(serviceValue); }}
            className="service-link mt-4 inline-flex items-center text-[var(--color-accent)] font-extrabold group"
        >
            Obtenir une estimation
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
    </div>
);

const Services: React.FC<{onServiceSelect: (serviceValue: string) => void}> = ({ onServiceSelect }) => {
    const services = [
        {
            title: "Couverture & Zinguerie",
            description: "Pose, rénovation et réparation de toitures en <strong class=\"font-semibold\">tuiles, ardoise, zinc, PVC ou bac acier</strong>. Entretien complet, remplacement de gouttières et faîtages.",
            serviceValue: "couverture_neuve",
            icon: <svg className="w-6 h-6 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        },
        {
            title: "Charpente & Isolation",
            description: "Réparation, renforcement ou création de charpente traditionnelle. <strong class=\"font-semibold\">Isolation performante</strong> : laine de roche, laine de verre, laine de coton. Écran sous toiture.",
            serviceValue: "charpente",
            icon: <svg className="w-6 h-6 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10m0 0h8m-8 0L9 14m-5 3L9 20m9-4V7m0 0L15 4m3 3l-3 3m3-3V4"></path></svg>
        },
        {
            title: "Nettoyage & Démoussage",
            description: "Nettoyage, traitement <strong class=\"font-semibold\">anti-mousse et hydrofuge</strong>. Assurez une toiture propre, protégée et durable.",
            serviceValue: "demoussage",
            icon: <svg className="w-6 h-6 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        },
        {
            title: "Vélux & Aménagement",
            description: "Pose de fenêtres de toit, étanchéité et isolation optimisées. Gain de lumière, confort et valeur ajoutée à l'habitat.",
            serviceValue: "velux",
            icon: <svg className="w-6 h-6 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0l-7 7-7-7M19 11l-7-7-7 7"></path></svg>
        },
        {
            title: "Cheminée & Gouttières",
            description: "<strong class=\"font-semibold\">Réparation et étanchéité de cheminée</strong>. Réfection de faîtage. Gouttières zinc ou PVC.",
            serviceValue: "gouttiere",
            icon: <svg className="w-6 h-6 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        },
    ];

    return (
        <section id="prestations" className="bg-[#F9FAFB] py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] text-center mb-12 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    Nos domaines d’intervention
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} delay={index * 100} onServiceSelect={onServiceSelect} />
                    ))}
                     <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 scroll-reveal opacity-0 translate-y-5" style={{ transitionDelay: `${services.length * 100}ms` }}>
                         <div className="text-center">
                            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">Besoin non listé ?</h3>
                            <p className="text-gray-600 mb-4">
                                Pour tout autre besoin, utilisez notre simulateur et sélectionnez "Autre".
                            </p>
                            <a href="#simulateur" data-service="autre" onClick={(e) => {e.preventDefault(); onServiceSelect('autre')}} className="service-link mt-4 inline-flex items-center text-[var(--color-accent)] font-extrabold group">
                                Demander un devis général
                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;