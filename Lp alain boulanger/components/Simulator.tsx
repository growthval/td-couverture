import React, { useState, useEffect } from 'react';
import type { SimulationData } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

// Helper pour envoyer les événements à GTM/GA4
const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    if (window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...params
        });
    } else {
        console.log('GTM Tracking:', eventName, params);
    }
};

// Component for choice buttons
const ChoiceButton: React.FC<{ value: string; nextStep?: string; iconUrl: string; label: string; onClick: (value: string, nextStep?: string) => void; isSelected: boolean; }> = ({ value, nextStep, iconUrl, label, onClick, isSelected }) => (
    <button
        className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 h-36 text-center ${isSelected ? 'border-[var(--color-primary)] bg-blue-50 shadow-md' : 'border-gray-300 bg-white hover:border-[var(--color-accent)] hover:-translate-y-1 hover:shadow-lg'}`}
        onClick={() => onClick(value, nextStep)}
    >
        <img src={iconUrl} alt={label} className="w-10 h-10 mb-3 object-contain" />
        <span className="font-semibold text-[var(--color-primary)] text-sm">{label}</span>
    </button>
);

const DetailButton: React.FC<{value: string, icon: string, label: string, onClick: (value: string) => void, isSelected: boolean}> = ({value, icon, label, onClick, isSelected}) => (
     <button 
        className={`w-full text-left flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-[var(--color-primary)] bg-blue-50 shadow-md' : 'border-gray-300 bg-white hover:border-[var(--color-accent)] hover:-translate-y-1 hover:shadow-lg'}`}
        onClick={() => onClick(value)}
    >
        <span className="text-2xl w-8 text-center">{icon}</span>
        <span className="font-semibold ml-4">{label}</span>
    </button>
);

// FIX: Define a type for the PRICE_MATRIX to allow for safe nested property access.
type PriceInfo = {
    min: number;
    max: number;
    unit: string;
};

type PriceDetails = {
    [key: string]: PriceInfo;
};

type PriceMatrixType = {
    [key: string]: PriceDetails;
};

const PRICE_MATRIX: PriceMatrixType = {
  'Nettoyage / Entretien': {
    'Feuilles/Saleté légère': { min: 20, max: 30, unit: '€/m²' },
    'Mousse visible': { min: 30, max: 45, unit: '€/m²' },
    'Mousse très épaisse': { min: 40, max: 60, unit: '€/m²' },
  },
  'Toiture Neuve / Rénovation': {
    'Construction neuve': { min: 130, max: 260, unit: '€/m²' },
    'Remplacement complet': { min: 180, max: 320, unit: '€/m²' },
  },
  'Aménagement de Combles': {
    'Isolation des combles': { min: 70, max: 150, unit: '€/m²' },
    'Aménagement complet': { min: 500, max: 1200, unit: '€/m²' },
  },
  'Gouttières': {
    'PVC': { min: 35, max: 75, unit: '€/ml' },
    'Zinc': { min: 60, max: 150, unit: '€/ml' },
    'Alu': { min: 55, max: 135, unit: '€/ml' },
  },
  'Réparation / Fuite': {
    'Fuite active': { min: 400, max: 800, unit: 'Forfait' },
    'Traces d\'humidité': { min: 200, max: 500, unit: 'Forfait' },
    'Simple vérification': { min: 150, max: 300, unit: 'Forfait' },
  },
  'Cheminée': {
    'Problème d\'étanchéité': { min: 400, max: 900, unit: 'Forfait' },
    'Réparation de la structure': { min: 800, max: 2000, unit: 'Forfait' },
    'Pose chapeau / Reprise pied': { min: 500, max: 1200, unit: 'Forfait' },
  },
  'Toiture Neuve / Rénovation-Forfait': {
    'Rénovation partielle': { min: 1500, max: 3500, unit: 'Forfait' },
  },
};

const calculatePrice = (data: SimulationData): string | null => {
    const { project, details, size } = data;
    if (!project || !details) return null;

    const parsedSize = size ? size.value : 0;

    let key = project;
    if (project === 'Toiture Neuve / Rénovation' && details === 'Rénovation partielle') {
        key = 'Toiture Neuve / Rénovation-Forfait';
    }

    // FIX: Access PRICE_MATRIX with string keys, relying on the new type definition for type safety.
    // This resolves the 'never' type error on `rates.min`, `rates.max`, and `rates.unit`.
    const rates = PRICE_MATRIX[key]?.[details];

    if (!rates) {
        return "Devis personnalisé requis";
    }

    let finalMin = rates.min;
    let finalMax = rates.max;
    const unit = rates.unit;
    
    const isForfait = unit === 'Forfait';

    if (!isForfait) {
        if (isNaN(parsedSize) || parsedSize <= 0) {
            return "Dimension requise";
        }
        finalMin = Math.round((finalMin * parsedSize) / 10) * 10;
        finalMax = Math.round((finalMax * parsedSize) / 10) * 10;
    }

    const minFormatted = finalMin.toLocaleString('fr-FR') + ' €';
    const maxFormatted = finalMax.toLocaleString('fr-FR') + ' €';
    
    return `${minFormatted} - ${maxFormatted}`;
};


interface SimulatorProps {
    initialService: string | null;
}

const Simulator: React.FC<SimulatorProps> = ({ initialService }) => {
    const [currentStep, setCurrentStep] = useState('project');
    const [stepHistory, setStepHistory] = useState(['project']);
    const [data, setData] = useState<SimulationData>({ project: null, details: null, size: null, contact: {} });
    const [estimation, setEstimation] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (initialService) {
            const serviceMap: { [key: string]: string } = {
                'reparation_fuite': 'Réparation / Fuite',
                'couverture_neuve': 'Toiture Neuve / Rénovation',
                'charpente': 'Aménagement de Combles',
                'isolation': 'Aménagement de Combles',
                'demoussage': 'Nettoyage / Entretien',
                'velux': 'Aménagement de Combles',
                'gouttiere': 'Gouttières'
            };
            
            const projectName = serviceMap[initialService];
            if (projectName) {
                setData(prev => ({ ...prev, project: projectName, details: null, size: null }));
                setCurrentStep('details');
                setStepHistory(['project', 'details']);
                // Tracking initial open from service click
                trackEvent('simulator_start', { project_type: projectName, source: 'service_card' });
            } else {
                // For 'autre' or unknown, just reset to the start
                setData({ project: null, details: null, size: null, contact: {} });
                setCurrentStep('project');
                setStepHistory(['project']);
            }
        }
    }, [initialService]);

    useEffect(() => {
        if (currentStep === 'size' && data.size === null) {
            const isGouttiere = data.project === 'Gouttières';
            setData(prev => ({
                ...prev,
                size: { value: isGouttiere ? 15 : 100, unit: isGouttiere ? 'm' : 'm²' }
            }));
        }
    }, [currentStep, data.project, data.size]);

    const TOTAL_STEPS = 4;
    const stepConfig: { [key: string]: { name: string, number: number, next?: string | (() => string) } } = {
        project: { name: 'project', number: 1 },
        details: { name: 'details', number: 2 },
        size: { name: 'size', number: 3, next: 'contact' },
        contact: { name: 'contact', number: 4, next: 'thanks' },
        thanks: { name: 'thanks', number: 4 }
    };
    
    const handleChoiceClick = (value: string, nextStep?: string) => {
        setData(prev => ({...prev, project: value, details: null, size: null })); // Reset subsequent steps
        setErrors({});
        // TRACKING: Step 1 Complete -> Project Selected
        trackEvent('simulator_start', { project_type: value });
        goToStep(nextStep || 'details');
    };
    
    const handleDetailClick = (value: string) => {
        setData(prev => ({...prev, details: value}));
        setErrors({});
        // TRACKING: Step 2 Complete -> Details Selected
        trackEvent('simulator_details', { 
            project_type: data.project,
            details: value 
        });
        const nextStep = (data.project === 'Réparation / Fuite' || data.project === 'Cheminée') ? 'contact' : 'size';
        goToStep(nextStep);
    };

    const goToStep = (stepId: string) => {
        setCurrentStep(stepId);
        if (!stepHistory.includes(stepId)) {
            setStepHistory(prev => [...prev, stepId]);
        }
    };

    const goBack = () => {
        const history = [...stepHistory];
        history.pop();
        const prevStep = history[history.length - 1];
        setCurrentStep(prevStep);
        setStepHistory(history);
        setErrors({});
    };

    const validateAndGoNext = () => {
        const newErrors: { [key: string]: string } = {};
        if (currentStep === 'contact') {
            const requiredFields: Array<keyof SimulationData['contact']> = ['nom', 'prenom', 'email', 'telephone', 'codePostal'];
            let allValid = true;
            requiredFields.forEach(field => {
                if (!data.contact[field] || data.contact[field]?.trim() === '') {
                    newErrors.contact = "Veuillez remplir tous les champs.";
                    allValid = false;
                }
            });
            if (allValid) {
                 handleSubmit();
            } else {
                 setErrors(newErrors);
            }
        } else if (currentStep === 'size') {
            // TRACKING: Step 3 Complete -> Size Validated
            trackEvent('simulator_size', {
                project_type: data.project,
                details: data.details,
                size_value: data.size?.value,
                size_unit: data.size?.unit
            });

            const nextStep = stepConfig[currentStep].next;
            if (typeof nextStep === 'string') goToStep(nextStep);
        }
    };

    // Tracking for form field interaction (Field Abandonment Analysis)
    const handleFieldBlur = (fieldName: string) => {
        if (data.contact[fieldName as keyof typeof data.contact]) {
             trackEvent('form_field_interaction', {
                 field_name: fieldName,
                 project_type: data.project
             });
        }
    };
    
    const handleSubmit = async () => {
        const price = calculatePrice(data);
        setEstimation(price);

        setIsLoading(true);
        setStatusMessage('Envoi en cours...');
        setErrors({});

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            // TRACKING: Step 4 Complete -> Lead Generated
            // IMPORTANT: We send user data to DataLayer for Google Ads Enhanced Conversions
            trackEvent('generate_lead', {
                project_type: data.project,
                value: price,
                user_data: {
                    email: data.contact.email,
                    phone_number: data.contact.telephone,
                    address: {
                        postal_code: data.contact.codePostal,
                        first_name: data.contact.prenom,
                        last_name: data.contact.nom
                    }
                }
            });

            setStatusMessage('Estimation envoyée !');
            goToStep('thanks');

        } catch (error) {
            console.error('Erreur lors de l\'envoi (CORS issue possible):', error);
            
            // TRACKING: Track lead even on error/optimistic success
             trackEvent('generate_lead', {
                project_type: data.project,
                value: price,
                status: 'optimistic',
                user_data: {
                    email: data.contact.email,
                    phone_number: data.contact.telephone
                }
            });

            setStatusMessage('Estimation envoyée !');
            goToStep('thanks');
        } finally {
             setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'project':
                return (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">Quel est votre projet ?</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <ChoiceButton value="Réparation / Fuite" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/improvement_cs3xol.svg" label="Réparation / Fuite" onClick={handleChoiceClick} isSelected={data.project === 'Réparation / Fuite'} />
                            <ChoiceButton value="Nettoyage / Entretien" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024530/eco_fishh8.svg" label="Nettoyage / Entretien" onClick={handleChoiceClick} isSelected={data.project === 'Nettoyage / Entretien'} />
                            <ChoiceButton value="Toiture Neuve / Rénovation" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024578/roof_2_ma9ozg.svg" label="Toiture Neuve / Rénovation" onClick={handleChoiceClick} isSelected={data.project === 'Toiture Neuve / Rénovation'} />
                            <ChoiceButton value="Gouttières" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/roof_1_ilpnxk.svg" label="Gouttières" onClick={handleChoiceClick} isSelected={data.project === 'Gouttières'} />
                            <ChoiceButton value="Cheminée" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024423/roof_wtxuz8.svg" label="Cheminée" onClick={handleChoiceClick} isSelected={data.project === 'Cheminée'} />
                            <ChoiceButton value="Aménagement de Combles" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/insulation_mcjrzm.svg" label="Aménagement Combles" onClick={handleChoiceClick} isSelected={data.project === 'Aménagement de Combles'} />
                        </div>
                    </div>
                );
            case 'details':
                 let detailsContent;
                 switch(data.project){
                     case 'Réparation / Fuite':
                        detailsContent = <>
                            <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Quel est le niveau d'urgence ?</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <DetailButton value="Fuite active" icon="⚠️" label="Fuite active (Urgent)" onClick={handleDetailClick} isSelected={data.details==="Fuite active"} />
                                <DetailButton value="Traces d'humidité" icon="💧" label="Traces d'humidité / Infiltration" onClick={handleDetailClick} isSelected={data.details==="Traces d'humidité"} />
                                <DetailButton value="Simple vérification" icon="👀" label="Simple vérification / Dégâts visibles" onClick={handleDetailClick} isSelected={data.details==="Simple vérification"} />
                            </div>
                        </>;
                        break;
                    case 'Nettoyage / Entretien':
                        detailsContent = <>
                             <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Quel est l'état actuel ?</h2>
                            <div className="grid grid-cols-1 gap-4">
                               <DetailButton value="Feuilles/Saleté légère" icon="🍃" label="Feuilles / Saleté légère" onClick={handleDetailClick} isSelected={data.details==="Feuilles/Saleté légère"} />
                               <DetailButton value="Mousse visible" icon="🌿" label="Mousse visible" onClick={handleDetailClick} isSelected={data.details==="Mousse visible"} />
                               <DetailButton value="Mousse très épaisse" icon="🌳" label="Mousse très épaisse / Lichen" onClick={handleDetailClick} isSelected={data.details==="Mousse très épaisse"} />
                            </div>
                        </>;
                        break;
                     case 'Toiture Neuve / Rénovation':
                        detailsContent = <>
                            <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Quel type de projet ?</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <DetailButton value="Construction neuve" icon="🏠" label="Construction neuve" onClick={handleDetailClick} isSelected={data.details==="Construction neuve"} />
                                <DetailButton value="Remplacement complet" icon="♻️" label="Remplacement complet de la toiture" onClick={handleDetailClick} isSelected={data.details==="Remplacement complet"} />
                                <DetailButton value="Rénovation partielle" icon="🩹" label="Rénovation partielle (ex: faîtage)" onClick={handleDetailClick} isSelected={data.details==="Rénovation partielle"} />
                            </div>
                        </>;
                        break;
                    case 'Gouttières':
                        detailsContent = <>
                             <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Quel est le matériau ?</h2>
                            <div className="grid grid-cols-1 gap-4">
                               <DetailButton value="PVC" icon="⚪" label="PVC" onClick={handleDetailClick} isSelected={data.details==="PVC"} />
                               <DetailButton value="Zinc" icon="🔘" label="Zinc" onClick={handleDetailClick} isSelected={data.details==="Zinc"} />
                               <DetailButton value="Alu" icon="💿" label="Aluminium" onClick={handleDetailClick} isSelected={data.details==="Alu"} />
                            </div>
                        </>;
                        break;
                    case 'Cheminée':
                        detailsContent = <>
                             <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Quel type de travaux ?</h2>
                            <div className="grid grid-cols-1 gap-4">
                               <DetailButton value="Problème d'étanchéité" icon="💧" label="Problème d'étanchéité / Fuite" onClick={handleDetailClick} isSelected={data.details==="Problème d'étanchéité"} />
                               <DetailButton value="Réparation de la structure" icon="🧱" label="Réparation de la structure" onClick={handleDetailClick} isSelected={data.details==="Réparation de la structure"} />
                               <DetailButton value="Pose chapeau / Reprise pied" icon="🧢" label="Pose chapeau / Reprise pied de cheminée" onClick={handleDetailClick} isSelected={data.details==="Pose chapeau / Reprise pied"} />
                            </div>
                        </>;
                        break;
                    case 'Aménagement de Combles':
                         detailsContent = <>
                             <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Quel type de projet ?</h2>
                            <div className="grid grid-cols-1 gap-4">
                               <DetailButton value="Isolation des combles" icon="❄️" label="Isolation des combles (perdus ou aménageables)" onClick={handleDetailClick} isSelected={data.details==="Isolation des combles"} />
                               <DetailButton value="Aménagement complet" icon="🛏️" label="Aménagement complet (création de pièces)" onClick={handleDetailClick} isSelected={data.details==="Aménagement complet"} />
                            </div>
                        </>;
                        break;
                    default:
                        detailsContent = <p>Veuillez retourner en arrière et sélectionner un projet.</p>;
                 }
                return detailsContent;

            case 'size':
                const isGouttiere = data.project === 'Gouttières';
                const sizeValue = data.size ? data.size.value : (isGouttiere ? 15 : 100);
                const unit = data.size ? data.size.unit : (isGouttiere ? 'm' : 'm²');
                return (
                     <div>
                        <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">{isGouttiere ? 'Longueur de gouttière (approximative)' : 'Surface au sol de votre maison'}</h2>
                        <p className="text-center text-5xl font-bold mb-6 text-[var(--color-primary)]">
                            <span id="slider-value">{sizeValue}</span> {unit}
                        </p>
                        <input type="range" id={isGouttiere ? "slider-longueur" : "slider-surface"} 
                               min={isGouttiere ? 5 : 20} max={isGouttiere ? 100 : 300} 
                               value={sizeValue} step={isGouttiere ? 1 : 5}
                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                               onInput={(e) => {
                                   const newValue = parseInt((e.target as HTMLInputElement).value, 10);
                                   setData(prev => ({ ...prev, size: { value: newValue, unit: isGouttiere ? 'm' : 'm²' } }));
                               }}/>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>{isGouttiere ? 5 : 20} {isGouttiere ? 'm' : 'm²'}</span>
                            <span>{isGouttiere ? 100 : 300} {isGouttiere ? 'm' : 'm²'}</span>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div>
                         <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-[var(--color-primary)]">Presque terminé !</h2>
                         <p className="text-center text-gray-600 mb-8">Renseignez vos informations pour recevoir votre estimation personnalisée.</p>
                         <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); validateAndGoNext(); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input 
                                        type="text" id="nom" required 
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]" 
                                        value={data.contact.nom || ''} 
                                        onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, nom: e.target.value }}))}
                                        onBlur={() => handleFieldBlur('nom')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <input 
                                        type="text" id="prenom" required 
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]" 
                                        value={data.contact.prenom || ''} 
                                        onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, prenom: e.target.value }}))}
                                        onBlur={() => handleFieldBlur('prenom')}
                                    />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" id="email" required 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]" 
                                    value={data.contact.email || ''} 
                                    onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, email: e.target.value }}))}
                                    onBlur={() => handleFieldBlur('email')}
                                />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    <input 
                                        type="tel" id="telephone" required 
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]" 
                                        value={data.contact.telephone || ''} 
                                        onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, telephone: e.target.value }}))}
                                        onBlur={() => handleFieldBlur('telephone')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="code-postal" className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                                    <input 
                                        type="text" id="code-postal" required 
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]" 
                                        value={data.contact.codePostal || ''} 
                                        onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, codePostal: e.target.value }}))}
                                        onBlur={() => handleFieldBlur('codePostal')}
                                    />
                                </div>
                             </div>
                             {errors.contact && <p className="text-red-600 text-sm">{errors.contact}</p>}
                             {statusMessage && <p className="text-center font-semibold text-[var(--color-primary)]">{statusMessage}</p>}
                         </form>
                    </div>
                );
             case 'thanks':
                return (
                    <div className="text-center py-12">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--color-accent)]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-4 text-[var(--color-primary)]">Merci, {data.contact.prenom || ''} !</h2>
                        <p className="text-gray-600 text-lg">Votre demande a bien été prise en compte.<br/>Un devis précis vous sera envoyé par e-mail sous 24h.</p>
                        
                        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
                            <h3 className="font-semibold text-lg text-[var(--color-primary)]">Votre estimation de prix :</h3>
                            <p className="text-3xl font-bold text-[var(--color-accent)] my-2">
                                {estimation || 'Calcul...'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Ceci est une fourchette de prix à titre indicatif.
                            </p>
                        </div>

                        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
                            <h3 className="font-semibold text-[var(--color-primary)]">Récapitulatif :</h3>
                            <p className="text-sm text-gray-700">
                                <strong>Projet:</strong> {data.project} <br/>
                                {data.details && <><strong>Détails:</strong> {data.details} <br/></>}
                                {data.size && <><strong>Dimension:</strong> {data.size.value}{data.size.unit}</>}
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const currentStepInfo = stepConfig[currentStep] || stepConfig.project;
    const progressPercent = Math.round((currentStepInfo.number / TOTAL_STEPS) * 100);

    return (
        <section id="simulateur" className="bg-[#F9FAFB] py-16 md:py-24 font-inter">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl">
                    {currentStep !== 'thanks' && (
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-[var(--color-primary)]">Étape {currentStepInfo.number} sur {TOTAL_STEPS}</span>
                                <span className="text-sm font-medium text-[var(--color-primary)]">{progressPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>
                    )}

                    <div className="min-h-[350px] flex flex-col justify-center">
                      {renderStep()}
                    </div>

                    {currentStep !== 'thanks' && (
                        <div className="flex justify-between mt-10">
                            {stepHistory.length > 1 && (
                                <button className="px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition" onClick={goBack}>
                                    Précédent
                                </button>
                            )}
                            {currentStep !== 'project' && currentStep !== 'details' && (
                                <button 
                                    className="px-6 py-3 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:bg-opacity-90 transition ml-auto disabled:bg-gray-400" 
                                    onClick={validateAndGoNext}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Envoi...' : (currentStep === 'contact' ? 'Recevoir mon estimation' : 'Suivant')}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Simulator;