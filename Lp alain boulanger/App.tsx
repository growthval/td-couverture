import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Reassurance from './components/Reassurance';
import Simulator from './components/Simulator';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import InterventionZone from './components/InterventionZone';
import Faq from './components/Faq';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [initialSimulatorService, setInitialSimulatorService] = useState<string | null>(null);

    const handleServiceSelect = useCallback((serviceValue: string) => {
        setInitialSimulatorService(serviceValue);
        const simulatorSection = document.getElementById('simulateur');
        if (simulatorSection) {
            // A small timeout allows React to process the state change before scrolling
            setTimeout(() => {
                simulatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-5');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);


    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main className="pt-20 md:pt-[76px]">
                <Hero />
                <Reassurance />
                <Simulator initialService={initialSimulatorService} />
                <Services onServiceSelect={handleServiceSelect} />
                <BeforeAfter />
                <Testimonials />
                <InterventionZone />
                <Faq />
            </main>
            <Footer />
        </div>
    );
};

export default App;