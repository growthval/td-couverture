import type { Testimonial, FaqItem } from './types';

export const PHONE = '0485 19 74 79';
export const PHONE_HREF = 'tel:+32485197479';

export const testimonials: Testimonial[] = [
  {
    name: 'Marc Delcourt',
    location: 'Client vérifié – Uccle',
    review: "Intervention rapide et très professionnelle suite à une fuite sur notre toiture. TD Couverture a diagnostiqué le problème en quelques minutes et a effectué la réparation dans la journée. Travail soigné, propre et durable. Je recommande vivement !",
    rating: 5,
  },
  {
    name: 'Isabelle Wauters',
    location: 'Cliente vérifiée – Schaerbeek',
    review: "Nous avons fait rénover complètement notre toiture en ardoise. L'équipe de TD Couverture est sérieuse, ponctuelle et le résultat est impeccable. Les travaux ont été réalisés dans les délais prévus. Excellent rapport qualité-prix.",
    rating: 5,
  },
  {
    name: 'Pierre Fonteneau',
    location: 'Client vérifié – Etterbeek',
    review: "TD Couverture a réalisé le nettoyage et le démoussage de ma toiture. Travail de qualité, équipe sympathique et très à l'écoute. Le résultat est parfait, ma toiture est comme neuve. Je recommande sans hésiter.",
    rating: 5,
  },
  {
    name: 'Nathalie Lecomte',
    location: 'Cliente vérifiée – Woluwe-Saint-Pierre',
    review: "J'ai fait appel à TD Couverture pour la réparation de mes gouttières en zinc et la réfection du faîtage. Devis clair, prix honnête, délais respectés. Professionnel du début à la fin. Je n'hésiterai pas à les recontacter.",
    rating: 5,
  },
  {
    name: 'Thomas Dubois',
    location: 'Client vérifié – Anderlecht',
    review: "Excellent artisan ! TD Couverture est intervenu en urgence suite à une tempête. En moins de 2 heures, tout était réparé. Sérieux, efficace et prix raisonnable. Bravo !",
    rating: 5,
  },
  {
    name: 'Sophie Renard',
    location: 'Cliente vérifiée – Ixelles',
    review: "Très satisfaite des travaux de charpente réalisés par TD Couverture. Conseils professionnels, matériaux de qualité et finitions parfaites. L'équipe est impliquée et respectueuse du chantier. Je recommande !",
    rating: 5,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Quels sont vos délais d'intervention à Bruxelles ?",
    answer: "Nous assurons un devis sous 24h et intervenons en priorité pour les urgences. En cas de fuite active ou de dégâts de tempête, nous nous déplaçons généralement dans la journée.",
  },
  {
    question: "Vos travaux sont-ils garantis ?",
    answer: "Oui, tous nos chantiers sont couverts par une <strong class=\"font-semibold\">garantie décennale</strong>. TD Couverture est un artisan certifié et pleinement assuré pour tous les travaux de couverture, charpente et maçonnerie.",
  },
  {
    question: "Dans quelles communes de Bruxelles intervenez-vous ?",
    answer: "Nous intervenons dans l'ensemble de la <strong class=\"font-semibold\">Région de Bruxelles-Capitale</strong> ainsi que dans les communes limitrophes (Braine-l'Alleud, Waterloo, Rhode-Saint-Genèse, Zaventem, etc.). Contactez-nous pour vérifier votre zone.",
  },
  {
    question: "Quels matériaux de couverture utilisez-vous ?",
    answer: "Nous travaillons avec l'<strong class=\"font-semibold\">ardoise naturelle et artificielle</strong>, le zinc, la tuile, le PVC et le bac acier. Tous nos matériaux sont conformes aux normes belges et européennes.",
  },
  {
    question: "Proposez-vous des petites réparations d'urgence ?",
    answer: "Oui, nous intervenons pour tout type de réparation : <strong class=\"font-semibold\">fuite de toiture</strong>, remplacement de tuiles, réfection de faîtage ciment, réparation de gouttières en zinc ou PVC, problèmes d'étanchéité de cheminée.",
  },
];

export const legalContent = `
    <h2 class="text-2xl font-bold mb-4" style="color:#2C3E50">Mentions Légales</h2>

    <h3 class="text-xl font-semibold mt-6 mb-3">Détails de l'entreprise</h3>
    <p>
        <strong>Entreprise :</strong> TD COUVERTURE<br>
        <strong>Numéro d'entreprise (BCE) :</strong> BE0503922819<br>
        <strong>Adresse :</strong> Avenue Jules Bordet 160/15, 1140 Evere<br>
        <strong>Téléphone :</strong> <a href="tel:0485197479" style="color:#D35400">0485 19 74 79</a>
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Direction et Réalisation</h3>
    <p>
        <strong>Directeur de la publication :</strong> THEOM DAVID<br>
        <strong>Conception :</strong> LvAgency<br>
        <strong>Hébergeur :</strong> 1&amp;1 IONOS SARL, 7 place de la Gare BP 70109, 57200 Sarreguemines
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Domaine d'activité</h3>
    <p>Travaux de couverture et de maçonnerie</p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Droits et Propriété Intellectuelle</h3>
    <p>Tous les contenus du site (pages, images, photos, scripts, textes) restent la propriété exclusive de l'entreprise belge « TD COUVERTURE ».</p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Données Personnelles</h3>
    <p>Conformément à la loi du 6 janvier 1978, chaque utilisateur dispose d'un droit d'accès, de rectification et de radiation concernant ses données personnelles.</p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Disclaimer</h3>
    <p>L'entreprise décline toute responsabilité concernant les dommages moraux ou physiques pouvant résulter de l'usage du site.</p>
`;


// IMPORTANT: Replace with your Google Apps Script deployment URL
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyawbk8nQzpAylpvtXx6lUKj8y4AtCnB5eyaZfphDtg5KWUMsN3GVj9V7sxXf-oeXwe/exec';
