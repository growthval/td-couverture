import React from 'react';

interface StatItem {
    value: React.ReactNode;
    label: string;
    delay: number;
}

const StatCard: React.FC<StatItem> = ({ value, label, delay }) => (
    <div
        className="flex flex-col items-center text-center p-5 scroll-reveal opacity-0 translate-y-5 transition-all duration-700"
        style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-accent)] mb-1">
            {value}
        </div>
        <p className="text-sm font-semibold text-[var(--color-primary)]">{label}</p>
    </div>
);

const Divider: React.FC = () => (
    <div className="hidden md:block w-px h-12 bg-gray-200 self-center" />
);

const Reassurance: React.FC = () => {
    const items: StatItem[] = [
        { value: '+15', label: "ans d'expérience", delay: 0 },
        { value: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ), label: 'Artisan certifié & assuré', delay: 100 },
        { value: '10 ans', label: 'garantie décennale', delay: 200 },
        { value: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        ), label: 'Matériaux certifiés', delay: 300 },
        { value: '24h', label: 'devis détaillé sous 24h', delay: 400 },
    ];

    return (
        <section className="bg-white py-8 md:py-12 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center md:justify-between items-stretch">
                    {items.map((item, i) => (
                        <React.Fragment key={i}>
                            <StatCard {...item} />
                            {i < items.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reassurance;
