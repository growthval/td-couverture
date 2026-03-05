import React, { useState, useEffect } from 'react';
import type { SimulationData } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

// Helper to send events to GTM/GA4
const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
    if (window.dataLayer) {
        window.dataLayer.push({ event: eventName, ...params });
    } else {
        console.log('GTM Tracking:', eventName, params);
    }
};

// Choice button (icon + label)
const ChoiceButton: React.FC<{
    value: string;
    nextStep?: string;
    iconUrl: string;
    label: string;
    onClick: (value: string, nextStep?: string) => void;
    isSelected: boolean;
}> = ({ value, nextStep, iconUrl, label, onClick, isSelected }) => (
    <button
        className={`flex flex-col items-center justify-center p-4 border-2 rounded cursor-pointer transition-all duration-200 h-36 text-center ${
            isSelected
                ? 'border-[var(--color-accent)] bg-orange-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-[var(--color-accent)] hover:-translate-y-1 hover:shadow-lg'
        }`}
        onClick={() => onClick(value, nextStep)}
    >
        <img src={iconUrl} alt={label} className="w-10 h-10 mb-3 object-contain" />
        <span className="font-heading font-semibold text-[var(--color-primary)] text-sm leading-tight">{label}</span>
    </button>
);

// Detail button (row style)
const DetailButton: React.FC<{
    value: string;
    icon: string;
    label: string;
    onClick: (value: string) => void;
    isSelected: boolean;
}> = ({ value, icon, label, onClick, isSelected }) => (
    <button
        className={`w-full text-left flex items-center gap-4 p-4 border-2 rounded cursor-pointer transition-all duration-200 ${
            isSelected
                ? 'border-[var(--color-accent)] bg-orange-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-[var(--color-accent)] hover:-translate-y-0.5 hover:shadow-md'
        }`}
        onClick={() => onClick(value)}
    >
        <span className="text-2xl w-8 text-center flex-shrink-0">{icon}</span>
        <span className="font-heading font-semibold text-[var(--color-primary)]">{label}</span>
    </button>
);

type PriceInfo = { min: number; max: number; unit: string };
type PriceDetails = { [key: string]: PriceInfo };
type PriceMatrixType = { [key: string]: PriceDetails };

const PRICE_MATRIX: PriceMatrixType = {
    'Nettoyage / Entretien': {
        'Feuilles / Saleté légère': { min: 25, max: 35, unit: '€/m²' },
        'Mousse visible': { min: 35, max: 55, unit: '€/m²' },
        'Mousse très épaisse / Lichen': { min: 50, max: 70, unit: '€/m²' },
    },
    'Couverture / Rénovation': {
        'Construction neuve': { min: 150, max: 280, unit: '€/m²' },
        'Remplacement complet': { min: 200, max: 350, unit: '€/m²' },
        'Rénovation partielle': { min: 1800, max: 4000, unit: 'Forfait' },
    },
    'Charpente': {
        'Réparation partielle': { min: 800, max: 2500, unit: 'Forfait' },
        'Remplacement complet': { min: 200, max: 400, unit: '€/m²' },
        'Renforcement / Traitement': { min: 600, max: 1800, unit: 'Forfait' },
    },
    'Gouttières': {
        'PVC': { min: 40, max: 80, unit: '€/ml' },
        'Zinc': { min: 65, max: 160, unit: '€/ml' },
        'Aluminium': { min: 60, max: 145, unit: '€/ml' },
    },
    'Réparation / Fuite': {
        'Fuite active': { min: 450, max: 900, unit: 'Forfait' },
        "Traces d'humidité": { min: 250, max: 550, unit: 'Forfait' },
        'Simple vérification': { min: 175, max: 350, unit: 'Forfait' },
    },
    'Maçonnerie': {
        'Réfection de faîtage': { min: 300, max: 800, unit: 'Forfait' },
        'Réparation cheminée': { min: 500, max: 1500, unit: 'Forfait' },
        'Autre travaux maçonnerie': { min: 200, max: 600, unit: 'Forfait' },
    },
};

const calculatePrice = (data: SimulationData): string | null => {
    const { project, details, size } = data;
    if (!project || !details) return null;

    const parsedSize = size ? size.value : 0;
    const rates = PRICE_MATRIX[project]?.[details];

    if (!rates) return 'Devis personnalisé requis';

    const isForfait = rates.unit === 'Forfait';

    if (!isForfait) {
        if (isNaN(parsedSize) || parsedSize <= 0) return 'Dimension requise';
        const finalMin = Math.round((rates.min * parsedSize) / 10) * 10;
        const finalMax = Math.round((rates.max * parsedSize) / 10) * 10;
        return `${finalMin.toLocaleString('fr-FR')} € – ${finalMax.toLocaleString('fr-FR')} €`;
    }

    return `${rates.min.toLocaleString('fr-FR')} € – ${rates.max.toLocaleString('fr-FR')} €`;
};

interface SimulatorProps {
    initialService: string | null;
}

const Simulator: React.FC<SimulatorProps> = ({ initialService }) => {
    const [currentStep, setCurrentStep] = useState('project');
    const [stepHistory, setStepHistory] = useState(['project']);
    const [data, setData] = useState<SimulationData>({
        project: null,
        details: null,
        size: null,
        contact: {},
    });
    const [estimation, setEstimation] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (initialService) {
            const serviceMap: { [key: string]: string } = {
                couverture: 'Couverture / Rénovation',
                charpente: 'Charpente',
                maconnerie: 'Maçonnerie',
                urgence: 'Réparation / Fuite',
                nettoyage: 'Nettoyage / Entretien',
                gouttieres: 'Gouttières',
            };
            const projectName = serviceMap[initialService];
            if (projectName) {
                setData((prev) => ({ ...prev, project: projectName, details: null, size: null }));
                setCurrentStep('details');
                setStepHistory(['project', 'details']);
                trackEvent('simulator_start', { project_type: projectName, source: 'service_card' });
            } else {
                setData({ project: null, details: null, size: null, contact: {} });
                setCurrentStep('project');
                setStepHistory(['project']);
            }
        }
    }, [initialService]);

    useEffect(() => {
        if (currentStep === 'size' && data.size === null) {
            const isGouttiere = data.project === 'Gouttières';
            setData((prev) => ({
                ...prev,
                size: { value: isGouttiere ? 15 : 100, unit: isGouttiere ? 'ml' : 'm²' },
            }));
        }
    }, [currentStep, data.project, data.size]);

    const TOTAL_STEPS = 4;
    const stepConfig: { [key: string]: { name: string; number: number; next?: string } } = {
        project: { name: 'project', number: 1 },
        details: { name: 'details', number: 2 },
        size: { name: 'size', number: 3, next: 'contact' },
        contact: { name: 'contact', number: 4, next: 'thanks' },
        thanks: { name: 'thanks', number: 4 },
    };

    const goToStep = (stepId: string) => {
        setCurrentStep(stepId);
        if (!stepHistory.includes(stepId)) {
            setStepHistory((prev) => [...prev, stepId]);
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

    const handleChoiceClick = (value: string, nextStep?: string) => {
        setData((prev) => ({ ...prev, project: value, details: null, size: null }));
        setErrors({});
        trackEvent('simulator_start', { project_type: value });
        goToStep(nextStep || 'details');
    };

    const handleDetailClick = (value: string) => {
        setData((prev) => ({ ...prev, details: value }));
        setErrors({});
        trackEvent('simulator_details', { project_type: data.project, details: value });
        const skipSize =
            data.project === 'Réparation / Fuite' ||
            data.project === 'Maçonnerie' ||
            (data.project === 'Charpente' && value !== 'Remplacement complet');
        goToStep(skipSize ? 'contact' : 'size');
    };

    const validateAndGoNext = () => {
        if (currentStep === 'contact') {
            const required: Array<keyof SimulationData['contact']> = [
                'nom', 'prenom', 'email', 'telephone', 'codePostal',
            ];
            let allValid = true;
            required.forEach((field) => {
                if (!data.contact[field] || data.contact[field]?.trim() === '') {
                    allValid = false;
                }
            });
            if (allValid) {
                handleSubmit();
            } else {
                setErrors({ contact: 'Veuillez remplir tous les champs.' });
            }
        } else if (currentStep === 'size') {
            trackEvent('simulator_size', {
                project_type: data.project,
                details: data.details,
                size_value: data.size?.value,
                size_unit: data.size?.unit,
            });
            goToStep('contact');
        }
    };

    const handleFieldBlur = (fieldName: string) => {
        if (data.contact[fieldName as keyof typeof data.contact]) {
            trackEvent('form_field_interaction', { field_name: fieldName, project_type: data.project });
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
                body: JSON.stringify(data),
            });

            trackEvent('generate_lead', {
                project_type: data.project,
                value: price,
                user_data: {
                    email: data.contact.email,
                    phone_number: data.contact.telephone,
                    address: {
                        postal_code: data.contact.codePostal,
                        first_name: data.contact.prenom,
                        last_name: data.contact.nom,
                    },
                },
            });

            setStatusMessage('Estimation envoyée !');
            goToStep('thanks');
        } catch {
            trackEvent('generate_lead', {
                project_type: data.project,
                value: price,
                status: 'optimistic',
                user_data: {
                    email: data.contact.email,
                    phone_number: data.contact.telephone,
                },
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
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-2 text-center text-[var(--color-primary)]">
                            Quel est votre projet ?
                        </h2>
                        <p className="text-center text-gray-500 mb-7 text-sm">Sélectionnez la prestation qui correspond à votre besoin</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <ChoiceButton value="Réparation / Fuite" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/improvement_cs3xol.svg" label="Réparation / Fuite" onClick={handleChoiceClick} isSelected={data.project === 'Réparation / Fuite'} />
                            <ChoiceButton value="Couverture / Rénovation" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024578/roof_2_ma9ozg.svg" label="Couverture / Rénovation" onClick={handleChoiceClick} isSelected={data.project === 'Couverture / Rénovation'} />
                            <ChoiceButton value="Charpente" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/insulation_mcjrzm.svg" label="Charpente" onClick={handleChoiceClick} isSelected={data.project === 'Charpente'} />
                            <ChoiceButton value="Gouttières" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024422/roof_1_ilpnxk.svg" label="Gouttières" onClick={handleChoiceClick} isSelected={data.project === 'Gouttières'} />
                            <ChoiceButton value="Nettoyage / Entretien" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024530/eco_fishh8.svg" label="Nettoyage / Entretien" onClick={handleChoiceClick} isSelected={data.project === 'Nettoyage / Entretien'} />
                            <ChoiceButton value="Maçonnerie" nextStep="details" iconUrl="https://res.cloudinary.com/dbnnymu2g/image/upload/v1763024423/roof_wtxuz8.svg" label="Maçonnerie" onClick={handleChoiceClick} isSelected={data.project === 'Maçonnerie'} />
                        </div>
                    </div>
                );

            case 'details': {
                let detailsContent: React.ReactNode;

                switch (data.project) {
                    case 'Réparation / Fuite':
                        detailsContent = (
                            <>
                                <h2 className="text-2xl font-heading font-bold mb-6 text-[var(--color-primary)]">Quel est le niveau d'urgence ?</h2>
                                <div className="grid gap-3">
                                    <DetailButton value="Fuite active" icon="⚠️" label="Fuite active (Urgent)" onClick={handleDetailClick} isSelected={data.details === 'Fuite active'} />
                                    <DetailButton value="Traces d'humidité" icon="💧" label="Traces d'humidité / Infiltration" onClick={handleDetailClick} isSelected={data.details === "Traces d'humidité"} />
                                    <DetailButton value="Simple vérification" icon="👀" label="Simple vérification / Dégâts visibles" onClick={handleDetailClick} isSelected={data.details === 'Simple vérification'} />
                                </div>
                            </>
                        );
                        break;
                    case 'Couverture / Rénovation':
                        detailsContent = (
                            <>
                                <h2 className="text-2xl font-heading font-bold mb-6 text-[var(--color-primary)]">Quel type de projet ?</h2>
                                <div className="grid gap-3">
                                    <DetailButton value="Construction neuve" icon="🏠" label="Construction neuve" onClick={handleDetailClick} isSelected={data.details === 'Construction neuve'} />
                                    <DetailButton value="Remplacement complet" icon="♻️" label="Remplacement complet de la toiture" onClick={handleDetailClick} isSelected={data.details === 'Remplacement complet'} />
                                    <DetailButton value="Rénovation partielle" icon="🩹" label="Rénovation partielle (faîtage, ardoises…)" onClick={handleDetailClick} isSelected={data.details === 'Rénovation partielle'} />
                                </div>
                            </>
                        );
                        break;
                    case 'Charpente':
                        detailsContent = (
                            <>
                                <h2 className="text-2xl font-heading font-bold mb-6 text-[var(--color-primary)]">Quel type de travaux ?</h2>
                                <div className="grid gap-3">
                                    <DetailButton value="Réparation partielle" icon="🔧" label="Réparation partielle / Remplacement d'éléments" onClick={handleDetailClick} isSelected={data.details === 'Réparation partielle'} />
                                    <DetailButton value="Remplacement complet" icon="🏗️" label="Remplacement complet de la charpente" onClick={handleDetailClick} isSelected={data.details === 'Remplacement complet'} />
                                    <DetailButton value="Renforcement / Traitement" icon="🛡️" label="Renforcement ou traitement fongicide" onClick={handleDetailClick} isSelected={data.details === 'Renforcement / Traitement'} />
                                </div>
                            </>
                        );
                        break;
                    case 'Gouttières':
                        detailsContent = (
                            <>
                                <h2 className="text-2xl font-heading font-bold mb-6 text-[var(--color-primary)]">Quel matériau ?</h2>
                                <div className="grid gap-3">
                                    <DetailButton value="PVC" icon="⚪" label="PVC" onClick={handleDetailClick} isSelected={data.details === 'PVC'} />
                                    <DetailButton value="Zinc" icon="🔘" label="Zinc" onClick={handleDetailClick} isSelected={data.details === 'Zinc'} />
                                    <DetailButton value="Aluminium" icon="💿" label="Aluminium" onClick={handleDetailClick} isSelected={data.details === 'Aluminium'} />
                                </div>
                            </>
                        );
                        break;
                    case 'Nettoyage / Entretien':
                        detailsContent = (
                            <>
                                <h2 className="text-2xl font-heading font-bold mb-6 text-[var(--color-primary)]">Quel est l'état actuel ?</h2>
                                <div className="grid gap-3">
                                    <DetailButton value="Feuilles / Saleté légère" icon="🍃" label="Feuilles / Saleté légère" onClick={handleDetailClick} isSelected={data.details === 'Feuilles / Saleté légère'} />
                                    <DetailButton value="Mousse visible" icon="🌿" label="Mousse visible" onClick={handleDetailClick} isSelected={data.details === 'Mousse visible'} />
                                    <DetailButton value="Mousse très épaisse / Lichen" icon="🌳" label="Mousse très épaisse / Lichen" onClick={handleDetailClick} isSelected={data.details === 'Mousse très épaisse / Lichen'} />
                                </div>
                            </>
                        );
                        break;
                    case 'Maçonnerie':
                        detailsContent = (
                            <>
                                <h2 className="text-2xl font-heading font-bold mb-6 text-[var(--color-primary)]">Quel type de travaux ?</h2>
                                <div className="grid gap-3">
                                    <DetailButton value="Réfection de faîtage" icon="🧱" label="Réfection de faîtage ciment" onClick={handleDetailClick} isSelected={data.details === 'Réfection de faîtage'} />
                                    <DetailButton value="Réparation cheminée" icon="🏠" label="Réparation / Étanchéité cheminée" onClick={handleDetailClick} isSelected={data.details === 'Réparation cheminée'} />
                                    <DetailButton value="Autre travaux maçonnerie" icon="🔩" label="Autre travaux de maçonnerie" onClick={handleDetailClick} isSelected={data.details === 'Autre travaux maçonnerie'} />
                                </div>
                            </>
                        );
                        break;
                    default:
                        detailsContent = <p>Veuillez retourner en arrière et sélectionner un projet.</p>;
                }
                return detailsContent;
            }

            case 'size': {
                const isGouttiere = data.project === 'Gouttières';
                const sizeValue = data.size ? data.size.value : (isGouttiere ? 15 : 100);
                const unit = data.size ? data.size.unit : (isGouttiere ? 'ml' : 'm²');
                return (
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-2 text-[var(--color-primary)]">
                            {isGouttiere ? 'Longueur de gouttière (approximative)' : 'Surface au sol de votre maison'}
                        </h2>
                        <p className="text-gray-500 text-sm mb-8">Faites glisser le curseur pour ajuster</p>
                        <p className="text-center text-5xl font-heading font-extrabold mb-6 text-[var(--color-accent)]">
                            {sizeValue} <span className="text-2xl">{unit}</span>
                        </p>
                        <input
                            type="range"
                            min={isGouttiere ? 5 : 20}
                            max={isGouttiere ? 100 : 300}
                            value={sizeValue}
                            step={isGouttiere ? 1 : 5}
                            className="w-full"
                            onInput={(e) => {
                                const newValue = parseInt((e.target as HTMLInputElement).value, 10);
                                setData((prev) => ({
                                    ...prev,
                                    size: { value: newValue, unit: isGouttiere ? 'ml' : 'm²' },
                                }));
                            }}
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                            <span>{isGouttiere ? '5 ml' : '20 m²'}</span>
                            <span>{isGouttiere ? '100 ml' : '300 m²'}</span>
                        </div>
                    </div>
                );
            }

            case 'contact':
                return (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-2 text-center text-[var(--color-primary)]">
                            Presque terminé !
                        </h2>
                        <p className="text-center text-gray-500 mb-7">
                            Renseignez vos informations pour recevoir votre estimation gratuite.
                        </p>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => { e.preventDefault(); validateAndGoNext(); }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-1">Nom *</label>
                                    <input
                                        type="text" id="nom" required
                                        className="form-input"
                                        placeholder="Dupont"
                                        value={data.contact.nom || ''}
                                        onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, nom: e.target.value } }))}
                                        onBlur={() => handleFieldBlur('nom')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-1">Prénom *</label>
                                    <input
                                        type="text" id="prenom" required
                                        className="form-input"
                                        placeholder="Jean"
                                        value={data.contact.prenom || ''}
                                        onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, prenom: e.target.value } }))}
                                        onBlur={() => handleFieldBlur('prenom')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email" id="email" required
                                    className="form-input"
                                    placeholder="jean.dupont@email.be"
                                    value={data.contact.email || ''}
                                    onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, email: e.target.value } }))}
                                    onBlur={() => handleFieldBlur('email')}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-1">Téléphone *</label>
                                    <input
                                        type="tel" id="telephone" required
                                        className="form-input"
                                        placeholder="0485 00 00 00"
                                        value={data.contact.telephone || ''}
                                        onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, telephone: e.target.value } }))}
                                        onBlur={() => handleFieldBlur('telephone')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="codePostal" className="block text-sm font-semibold text-gray-700 mb-1">Code Postal *</label>
                                    <input
                                        type="text" id="codePostal" required
                                        className="form-input"
                                        placeholder="1000"
                                        value={data.contact.codePostal || ''}
                                        onChange={(e) => setData((p) => ({ ...p, contact: { ...p.contact, codePostal: e.target.value } }))}
                                        onBlur={() => handleFieldBlur('codePostal')}
                                    />
                                </div>
                            </div>
                            {errors.contact && (
                                <p className="text-red-600 text-sm">{errors.contact}</p>
                            )}
                            {statusMessage && (
                                <p className="text-center font-semibold text-[var(--color-primary)]">{statusMessage}</p>
                            )}
                        </form>
                    </div>
                );

            case 'thanks':
                return (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="h-9 w-9 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-heading font-extrabold mt-2 mb-3 text-[var(--color-primary)]">
                            Merci, {data.contact.prenom || ''} !
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Votre demande a bien été enregistrée.<br />
                            Nous vous rappelons sous 24h avec votre devis précis.
                        </p>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6 text-center">
                            <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">Votre estimation indicative :</p>
                            <p className="text-3xl font-heading font-extrabold text-[var(--color-accent)] my-2">
                                {estimation || 'Calcul…'}
                            </p>
                            <p className="text-xs text-gray-500">
                                Fourchette indicative. Le devis définitif sera établi après visite.
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
                            <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">Récapitulatif :</p>
                            <p className="text-sm text-gray-700">
                                <strong>Projet :</strong> {data.project}<br />
                                {data.details && <><strong>Détail :</strong> {data.details}<br /></>}
                                {data.size && <><strong>Dimension :</strong> {data.size.value} {data.size.unit}</>}
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
        <section id="simulateur" className="bg-[var(--color-bg-section)] py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-10 scroll-reveal opacity-0 translate-y-5 transition-all duration-700">
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-primary)] mb-3">
                        Estimez votre projet en 2 minutes
                    </h2>
                    <div className="section-divider" />
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                        Notre simulateur gratuit vous donne une fourchette de prix instantanée. Sans engagement.
                    </p>
                </div>

                <div className="bg-white p-6 md:p-10 rounded-lg shadow-[0_8px_40px_rgba(44,62,80,0.1)]">
                    {/* Progress bar */}
                    {currentStep !== 'thanks' && (
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-heading font-semibold text-[var(--color-primary)]">
                                    Étape {currentStepInfo.number} sur {TOTAL_STEPS}
                                </span>
                                <span className="text-sm font-semibold text-[var(--color-accent)]">{progressPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${progressPercent}%`,
                                        background: 'var(--color-accent)',
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step content */}
                    <div className="min-h-[350px] flex flex-col justify-center">
                        {renderStep()}
                    </div>

                    {/* Navigation buttons */}
                    {currentStep !== 'thanks' && (
                        <div className="flex justify-between mt-10 gap-4">
                            {stepHistory.length > 1 && (
                                <button
                                    className="px-6 py-3 rounded font-heading font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                                    onClick={goBack}
                                >
                                    ← Précédent
                                </button>
                            )}
                            {currentStep !== 'project' && currentStep !== 'details' && (
                                <button
                                    className="btn-primary px-8 py-3 ml-auto disabled:bg-gray-300 disabled:shadow-none disabled:transform-none"
                                    onClick={validateAndGoNext}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Envoi…'
                                        : currentStep === 'contact'
                                        ? 'Recevoir mon estimation gratuite'
                                        : 'Suivant →'}
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
