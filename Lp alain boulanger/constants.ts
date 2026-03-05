import type { Testimonial, FaqItem } from './types';

export const testimonials: Testimonial[] = [
  {
      name: "Roger Mouret",
      location: "Client vérifié",
      review: "J'ai fait appel à cette entreprise pour le changement complet de ma toiture, et je suis vraiment très satisfait du résultat. L'équipe a été professionnelle, ponctuelle et très soigneuse du début à la fin. Le chantier a été réalisé dans les délais annoncés, le nettoyage impeccable. Je recommande sans hésiter !",
      rating: 5
  },
  {
      name: "Ayce Team",
      location: "Client vérifié",
      review: "Intervention rapide et professionnelle pour une réparation de fuite. Après un diagnostic précis, la fuite a été localisée et réparée efficacement. Le travail est propre, soigné et durable. Le couvreur a pris le temps d'expliquer les causes du problème et de donner des conseils d'entretien. Je recommande vivement pour leur réactivité et la qualité du travail.",
      rating: 5
  },
  {
      name: "Jacquemin James",
      location: "Client vérifié",
      review: "On m'a recommandé l'entreprise de Boulanger Alain toiture. Leur travail est de grande qualité et grandement soigné. Je recommande vivement.",
      rating: 5
  },
  {
      name: "Lucile Fontaine",
      location: "Client vérifié",
      review: "Travaux effectués avec soins et professionnalisme. Entreprise sérieuse et à l'écoute du client. Je recommande.",
      rating: 5
  },
  {
      name: "Levy Deplechin",
      location: "Client vérifié",
      review: "Je recommande très professionnel super boulot !",
      rating: 5
  },
  {
      name: "Lucie Du pont",
      location: "Client vérifié",
      review: "Très sympathique, super travail, je recommande ! Points positifs : Ponctualité, Qualité, Professionnalisme, Prix.",
      rating: 5
  }
];

export const faqItems: FaqItem[] = [
    {
        question: "Quels sont vos délais d’intervention ?",
        answer: "Devis sous 24 h, intervention prioritaire en cas d’urgence. Nous veillons à être votre couvreur réactif à proximité."
    },
    {
        question: "Vos travaux sont-ils garantis ?",
        answer: "Oui, tous nos chantiers sont couverts par une <strong class=\"font-semibold\">garantie décennale</strong>. Notre entreprise de couverture est certifiée et assurée."
    },
    {
        question: "Quels matériaux utilisez-vous ?",
        answer: "Nous travaillons avec l'ardoise, le zinc, le PVC, le bac acier et les tuiles anciennes, tous nos matériaux sont conformes aux normes européennes."
    },
    {
        question: "Travaillez-vous sur les petites réparations ?",
        answer: "Oui, nous assurons les petites réparations essentielles : <strong class=\"font-semibold\">réparation cheminée</strong>, réfection de <strong class=\"font-semibold\">faîtage</strong> ciment, pose et <strong class=\"font-semibold\">réparation gouttière zinc</strong>, et travaux d'<strong class=\"font-semibold\">étanchéité</strong>."
    },
    {
        question: "Proposez-vous l’isolation de toiture ?",
        answer: "Oui : laine de roche, laine de verre, laine de coton, avec écran sous toiture. Profitez d'un confort optimal et d'économies d'énergie."
    }
];

export const legalContent = `
    <h2 class="text-2xl font-bold mb-4 text-[#003366]">Informations légales</h2>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">1. Présentation du site.</h3>
    <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site sur lequel vous naviguez l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
    
    <p class="mt-3"><strong>Responsable de la publication :</strong><br>
    Alain BOULANGER, Dirigeant Fondateur<br>
    Entreprise Alain Boulanger, spécialiste Couverture • Étanchéité • Zinguerie<br>
    8 Boulevard Roy<br>
    93320 Les Pavillons-sous-Bois<br>
    SIREN : 482288388</p>
    
    <p class="mt-3">Les mentions du « site sur lequel vous naviguez » font référence au domaine ou sous-domaine <strong>alainboulanger-toiture.fr</strong></p>
    
    <p class="mt-3"><strong>Hébergeur :</strong> O2Switch, Chemin des Pardiaux, 63000 Clermont-Ferrand, capital de 100000€, Siret 510 909 80700024.</p>
    
    <p class="mt-3"><strong>Propriétaire, créateur :</strong> A2JM, 229 rue Saint-Honoré, 75001 Paris, Paris B 850 543 000, EURL au capital de 1000€.</p>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">2. Conditions générales d’utilisation du site et des services proposés.</h3>
    <p>L’utilisation du site sur lequel vous naviguez implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site sur lequel vous naviguez sont donc invités à les consulter de manière régulière.</p>
    <p>Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par A2JM, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.</p>
    <p>Le site sur lequel vous naviguez est mis à jour régulièrement par le webmaster. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.</p>
    <p>A2JM s’efforce de fournir sur le site sur lequel vous naviguez des informations aussi précises que possible. Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.</p>
    <p>Toutes les informations indiquées sur le site sur lequel vous naviguez sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le site sur lequel vous naviguez ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.</p>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">4. Limitations contractuelles sur les données techniques.</h3>
    <p>Le site utilise la technologie JavaScript.</p>
    <p>Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour.</p>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">5. Propriété intellectuelle et contrefaçons.</h3>
    <p>A2JM est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.</p>
    <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : A2JM.</p>
    <p>Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">6. Limitations de responsabilité.</h3>
    <p>A2JM ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site sur lequel vous naviguez, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées au point 4, soit de l’apparition d’un bug ou d’une incompatibilité.</p>
    <p>A2JM ne pourra également être tenue responsable des dommages indirects (tels par exemple qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site sur lequel vous naviguez.</p>
    <p>Des espaces interactifs (possibilité de poser des questions dans l’espace contact) sont à la disposition des utilisateurs. A2JM se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, A2JM se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).</p>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">7. Gestion des données personnelles.</h3>
    <p>En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.</p>
    <p>A l'occasion de l'utilisation du site sur lequel vous naviguez, peuvent êtres recueillis : l'URL des liens par l'intermédiaire desquels l'utilisateur a accédé au site sur lequel vous naviguez, le fournisseur d'accès de l'utilisateur, l'adresse de protocole Internet (IP) de l'utilisateur.</p>
    <p>En tout état de cause A2JM ne collecte des informations personnelles relatives à l'utilisateur que pour le besoin de certains services proposés par le site sur lequel vous naviguez. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site sur lequel vous naviguez l’obligation ou non de fournir ces informations.</p>
    <p>Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, tout utilisateur dispose d’un droit d’accès, de rectification et d’opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d’une copie du titre d’identité avec signature du titulaire de la pièce, en précisant l’adresse à laquelle la réponse doit être envoyée.</p>
    <p>Aucune information personnelle de l'utilisateur du site sur lequel vous naviguez n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat de A2JM et de ses droits permettrait la transmission des dites informations à l'éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site sur lequel vous naviguez.</p>
    <p>Le site n'est pas déclaré à la CNIL car il ne recueille pas d'informations personnelles.</p>
    <p>Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.</p>
    
    <h3 class="text-xl font-semibold mt-6 mb-3">8. Liens hypertextes et cookies.</h3>
    <p>Le site sur lequel vous naviguez contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation de A2JM. Cependant, A2JM n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.</p>
    <p>La navigation sur le site sur lequel vous naviguez est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation d’un ordinateur sur un site. Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre diverses mesures de fréquentation.</p>
    <p>Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’utilisateur peut toutefois configurer son ordinateur de la manière suivante, pour refuser l’installation des cookies :</p>
    <p>Sous Internet Explorer : onglet outil (pictogramme en forme de rouage en haut à droite) / options internet. Cliquez sur Confidentialité et choisissez Bloquer tous les cookies.</p>
  `;

export const privacyContent = `
    <h2 class="text-2xl font-bold mb-4 text-[#003366]">Politique de Confidentialité</h2>
    
    <div class="p-4 bg-gray-100 rounded-lg mb-6">
        <p class="mb-2">Bonjour cher visiteur,</p>
        <ul class="list-disc list-inside space-y-1 ml-4">
            <li>Vos données sont confidentielles.</li>
            <li>Elles ne sont pas partagées à des tiers.</li>
        </ul>
        <p class="mt-3 font-semibold">Nous les utilisons pour :</p>
        <ul class="list-disc list-inside space-y-1 ml-4">
            <li>Vous contacter par téléphone pour vous conseiller sur vos travaux</li>
            <li>Vous envoyer des conseils personnalisés par email</li>
        </ul>
        <p class="mt-3">C'est tout.</p>
        <p>Et vous pouvez vous désabonner en un clic grâce au lien situé en bas de chacun de nos emails.</p>
        <p>Si vous souhaitez plus d'informations, vous aurez la procédure détaillée ci-dessous.</p>
        <p class="mt-4">En attendant, nous vous souhaitons une bonne journée.<br>
        <strong>Alain BOULANGER, directeur de l’entreprise Alain Boulanger</strong><br>
        Spécialiste Couverture • Étanchéité • Zinguerie<br>
        8 Boulevard Roy, 93320 Les Pavillons-sous-Bois, France</p>
        <p class="font-light mt-2">PS : si vous souhaitez obtenir un devis, cliquez sur le bouton ci-dessous et remplissez le formulaire.</p>
    </div>

    <h3 class="text-xl font-semibold mt-6 mb-3">Introduction</h3>
    <p>Devant le développement des nouveaux outils de communication, il est nécessaire de porter une attention particulière à la protection de la vie privée. C'est pourquoi, nous nous engageons à respecter la confidentialité des renseignements personnels que nous collectons.</p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Collecte des renseignements personnels</h3>
    <p>Lorsque vous remplissez un formulaire présent sur le site, nous collectons les informations que vous nous envoyez afin qu'un conseiller puisse vous rappeler et évaluer avec vous les dispositifs financiers existant dont vous pouvez bénéficier dans le cadre de travaux d'isolation ou d'énergie pour votre logement.</p>
    <p>Vous pouvez à tout moment nous envoyer un email via notre formulaire de contact afin de nous demander de les supprimer : <strong>cliquez-ici pour accéder au formulaire</strong></p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Conservation des données:</h3>
    <p>Vos données sont conservées 1 mois puis sont anonymisées. Par exemple, votre nom n'apparaîtra plus en clair dans nos fichiers. Monsieur DUPOND deviendra Monsieur D****.</p>
    <p>Elles sont conservées sous cette forme à des fins statistiques.</p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Droit d'opposition et de retrait</h3>
    <p>Nous nous engageons à vous offrir un droit d'opposition et de retrait quant à vos renseignements personnels.</p>
    <p>Le droit d'opposition s'entend comme étant la possibilité offerte aux internautes de refuser que leurs renseignements personnels soient utilisées à certaines fins mentionnées lors de la collecte.</p>
    <p>Le droit de retrait s'entend comme étant la possibilité offerte aux internautes de demander à ce que leurs renseignements personnels ne figurent plus, par exemple, dans une liste de diffusion.</p>
    <p>Pour pouvoir exercer ces droits, vous pouvez nous contacter via le formulaire de contact : <strong>Formulaire de contact</strong></p>
    <p>Nous vous confirmerons avoir bien reçu votre demande dans les 72h.</p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Droit d'accès</h3>
    <p>Nous nous engageons à reconnaître un droit d'accès et de rectification aux personnes concernées désireuses de consulter, modifier, voire radier les informations les concernant.</p>
    <p>L'exercice de ce droit se fera en nous écrivant via le formulaire de contact : <strong>Formulaire de contact</strong></p>

    <h3 class="text-xl font-semibold mt-6 mb-3">Sécurité</h3>
    <p>Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes travaillant pour nous sont tenues de respecter la confidentialité de vos informations.</p>
    <p>Pour assurer la sécurité de vos renseignements personnels, nous avons recours aux mesures suivantes :</p>
    <ul class="list-disc list-inside space-y-1 ml-4 text-gray-700">
        <li>Protocole SSL (Secure Sockets Layer)</li>
        <li>Gestion des accès - personne autorisée</li>
        <li>Sauvegarde informatique</li>
        <li>Développement de certificat numérique</li>
        <li>Pare-feu (Firewalls)</li>
    </ul>
    <p class="mt-3">Nous nous engageons à maintenir un haut degré de confidentialité en intégrant les dernières innovations technologiques permettant d'assurer la confidentialité de vos transactions. Toutefois, comme aucun mécanisme n'offre une sécurité maximale, une part de risque est toujours présente lorsque l'on utilise Internet pour transmettre des renseignements personnels.</p>
  `;

// IMPORTANT: Replace this URL with the one you get after deploying your Google Apps Script
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzAAi9wo8GhC--l4Wosa2NlTTWm5uOqHuWnhC2sSpZW2CT5Dhv_z8y3o1TbLcjieRbkIw/exec';