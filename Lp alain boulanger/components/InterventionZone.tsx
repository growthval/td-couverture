import React from 'react';

const InterventionZone: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        Notre zone d'intervention rapide
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Nous intervenons principalement sur le 93 (Seine-Saint-Denis) et le 94 (Val-de-Marne). Villes principales : Vincennes, Montreuil, Fontenay-sous-Bois, Saint-Maur-des-Fossés, Créteil, Le Perreux-sur-Marne, Nogent-sur-Marne, Joinville-le-Pont, Rosny-sous-Bois, et communes avoisinantes.
                    </p>
                </div>
                
                <div className="flex justify-center items-center">
                    <img 
                        src="https://res.cloudinary.com/dbnnymu2g/image/upload/v1762934833/ChatGPT_Image_12_nov._2025_09_06_37_bzoar0.webp" 
                        alt="Carte de la région Île-de-France avec les départements 93 et 94 mis en évidence."
                        className="rounded-xl shadow-2xl w-full max-w-2xl h-auto object-cover"
                    />
                </div>
                <div className="text-center mt-6">
                    <p className="text-lg font-medium text-[#003366]">
                        Dépannage d'urgence sous 2 heures sur ces deux départements.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default InterventionZone;
