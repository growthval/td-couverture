import React, { useState } from 'react';
import { faqItems } from '../constants';

const FaqItem: React.FC<{
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    delay: number;
}> = ({ question, answer, isOpen, onClick, delay }) => (
    <div
        className="bg-white rounded-lg shadow-[0_2px_12px_rgba(44,62,80,0.07)] overflow-hidden scroll-reveal opacity-0 translate-y-5 transition-all duration-700"
        style={{ transitionDelay: `${delay}ms` }}
    >
        <button
            className="w-full text-left p-5 md:p-6 font-heading font-semibold text-[var(--color-primary)] flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors duration-150"
            onClick={onClick}
        >
            <span>{question}</span>
            <span
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] flex items-center justify-center text-sm font-bold transition-transform duration-300 ${isOpen ? 'rotate-45 bg-[var(--color-accent)] text-white' : ''}`}
            >
                +
            </span>
        </button>
        <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'}`}
        >
            <div className="px-5 md:px-6 pb-5 border-t border-gray-100 pt-4">
                <p
                    className="text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
            </div>
        </div>
    </div>
);

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        const isOpening = openIndex !== index;
        setOpenIndex(isOpening ? index : null);
        if (isOpening && window.dataLayer) {
            window.dataLayer.push({ event: 'toggle_faq', faq_question: faqItems[index].question });
        }
    };

    return (
        <section id="faq" className="bg-[var(--color-bg-section)] py-16 md:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-primary)] mb-3">
                        Questions fréquentes
                    </h2>
                    <div className="section-divider" />
                </div>

                <div className="space-y-3">
                    {faqItems.map((item, i) => (
                        <FaqItem
                            key={i}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === i}
                            onClick={() => handleToggle(i)}
                            delay={i * 80}
                        />
                    ))}
                </div>

                {/* CTA below FAQ */}
                <div className="mt-12 text-center scroll-reveal opacity-0 translate-y-5 transition-all duration-700" style={{ transitionDelay: '400ms' }}>
                    <p className="text-gray-600 mb-5">
                        Vous avez d'autres questions ? Nous sommes disponibles pour vous répondre.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="#simulateur" className="btn-primary px-8 py-3 text-sm text-center">
                            Obtenir un devis gratuit
                        </a>
                        <a
                            href="tel:+32485197479"
                            className="btn-urgent px-8 py-3 text-sm text-center flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            0485 19 74 79
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
