import React, { useState, useEffect } from 'react';
import { legalContent, privacyContent } from '../constants';

const LegalModal: React.FC<{ type: 'legal' | 'privacy'; onClose: () => void }> = ({ type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden'; // Lock body scroll

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset'; // Unlock body scroll
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish before calling parent's close handler
    };

    return (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        >
            <div 
                className={`bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 p-2 rounded-full z-10"
                    aria-label="Fermer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="prose max-w-none text-gray-700 pr-4" dangerouslySetInnerHTML={{ __html: type === 'legal' ? legalContent : privacyContent }}></div>
            </div>
        </div>
    );
};


const Footer: React.FC = () => {
    const [modalType, setModalType] = useState<'legal' | 'privacy' | null>(null);

    const trackPhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'click_phone',
                location: 'footer'
            });
        }
    };

    return (
        <>
            <footer id="footer" className="bg-[#003366] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-lg font-bold mb-2">Alain Boulanger Toiture — Artisan couvreur-charpentier</p>
                    <p className="mb-4">Intervention rapide en Seine-Saint-Denis (93) & Val-de-Marne (94)</p>
                    
                    <div className="flex justify-center space-x-8 mb-6">
                        <a 
                            href="tel:0185536082" 
                            className="hover:text-[#FF6600] transition duration-300"
                            onClick={trackPhoneClick}
                        >
                            📞 01 85 53 60 82
                        </a>
                    </div>

                    <div className="text-sm space-x-4 mb-4">
                        <button onClick={() => setModalType('legal')} className="underline hover:text-orange-300 transition">
                            Mentions Légales
                        </button>
                        <button onClick={() => setModalType('privacy')} className="underline hover:text-orange-300 transition">
                            Politique de Confidentialité
                        </button>
                    </div>

                    <p className="text-sm mt-4 text-gray-400">© {new Date().getFullYear()} Alain Boulanger Toiture – Tous droits réservés</p>
                </div>
            </footer>
            {modalType && <LegalModal type={modalType} onClose={() => setModalType(null)} />}
        </>
    );
};

export default Footer;