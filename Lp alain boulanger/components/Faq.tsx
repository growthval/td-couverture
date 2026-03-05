import React, { useState } from 'react';
import { faqItems } from '../constants';

interface FaqItemProps {
    item: { question: string; answer: string };
    isOpen: boolean;
    onClick: () => void;
    delay: number;
}

const FaqItemComponent: React.FC<FaqItemProps> = ({ item, isOpen, onClick, delay }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg scroll-reveal opacity-0 translate-y-5 transition-all duration-700" style={{ transitionDelay: `${delay}ms` }}>
            <button className="w-full text-left p-5 font-semibold text-lg text-[#003366] flex justify-between items-center" onClick={onClick}>
                {item.question}
                <span className={`text-[#FF6600] text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-5 pt-0 text-gray-700">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                </div>
            </div>
        </div>
    );
};

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        const isOpening = openIndex !== index;
        setOpenIndex(isOpening ? index : null);
        
        if (isOpening && window.dataLayer) {
             window.dataLayer.push({
                event: 'toggle_faq',
                faq_question: faqItems[index].question
            });
        }
    };

    return (
        <section id="faq" className="bg-[#F9FAFB] py-16 md:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366] text-center mb-12 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    Questions Fréquentes (FAQ)
                </h2>
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <FaqItemComponent 
                            key={index} 
                            item={item} 
                            isOpen={openIndex === index} 
                            onClick={() => handleToggle(index)}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;