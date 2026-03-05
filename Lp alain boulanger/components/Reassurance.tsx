import React from 'react';

const ReassuranceCard: React.FC<{ title: React.ReactNode; description: string; delay?: number }> = ({ title, description, delay = 0 }) => (
    <div className="flex flex-col items-center p-4 scroll-reveal opacity-0 translate-y-5 transition-all duration-700" style={{ transitionDelay: `${delay}ms` }}>
        {title}
        <p className="text-sm font-semibold text-[#003366] mt-1 text-center">{description}</p>
    </div>
);


const Reassurance: React.FC = () => {
    const items = [
        {
            title: <span className="text-3xl md:text-4xl font-extrabold text-[#FF6600]">+15</span>,
            description: "ans d’expérience"
        },
        {
            title: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-[#FF6600]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
            ),
            description: "Artisan certifié & assuré"
        },
        {
            title: <span className="text-xl md:text-2xl font-extrabold text-[#FF6600]">10 ans</span>,
            description: "sur tous les travaux (Décennale)"
        },
        {
            title: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-[#FF6600]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            ),
            description: "Matériaux conformes aux normes"
        },
        {
            title: <span className="text-3xl md:text-4xl font-extrabold text-[#FF6600]">24h</span>,
            description: "Devis détaillé sous 24h"
        }
    ];

    return (
        <section id="reassurance" className="bg-[#FFFFFF] py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                    {items.map((item, index) => (
                        <ReassuranceCard key={index} title={item.title} description={item.description} delay={index * 100} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reassurance;