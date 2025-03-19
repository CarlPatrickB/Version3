import React, { useState, useEffect } from 'react';
const ProbatioForm = () => {
    // État principal du formulaire - version simplifiée pour plus de concision
    const [formData, setFormData] = useState({
        // Section 1: Identification de l'interaction
        callReason: '',
        agentName: '',
        interactionMode: '',
        // Section 2: Identification du client
        identityConfirmed: '',
        infoConsentGiven: '',
        consentRecorded: '',
        // Section 3: Résumé de la requête
        requestSummary: '',
        clientNeeds: [],
        clientNeedsOther: '',
        specificExpectations: '',
        requestUrgency: '',
        // Section 4: Type de transaction
        mainCategory: '',
        autoOperations: [],
        homeOperations: [],
        transactionReason: '',
        // Section 5: Analyse des besoins
        needsQuestionnaire: '',
        priorities: [],
        specificCoverage: '',
        situationChanges: [],
        situationChangesOther: '',
        needsAnalysis: '',
        // Section 6: Aggravations de risques
        riskFactors: [],
        riskFactorsOther: '',
        riskDetails: '',
        riskInfoDisclosed: '',
        riskExplained: '',
        clientReaction: '',
        // Section 7: Protections et garanties
        protectionsOffered: [],
        protectionsOther: '',
        rejectedProtections: [],
        rejectedProtectionsOther: '',
        rejectionReason: '',
        rejectionConsequences: '',
        clientUnderstands: '',
        confirmationMethod: '',
        // Section 8: Renouvellement
        lastRenewalDate: '',
        needsReviewCompleted: '',
        changesDescription: '',
        recommendedChanges: '',
        changesAccepted: '',
        rejectedChanges: '',
        reviewDocumented: '',
        // Section 9: Particularités
        notableElements: '',
        clientInfo: '',
        attentionPoints: '',
        claimsHistory: '',
        // Section 10: Recommandations
        recommendations: '',
        explainedLimitations: [],
        limitationsOther: '',
        exclusions: '',
        clientUnderstandsExclusions: '',
        understandingMethod: '',
        // Section 11: Frais et rémunération
        premiumType: [],
        remunerationDisclosed: '',
        remunerationType: '',
        financialTiesDisclosed: '',
        disclosureMethod: '',
        // Section 12: Informations manquantes
        missingInfo: [],
        missingInfoOther: '',
        missingInfoDetails: '',
        missingInfoDeadline: '',
        consequencesExplained: '',
        reminderMethod: '',
        // Section 13: Suivi
        actions: [],
        actionsOther: '',
        followUpDate: '',
        followUpPerson: '',
        followUpDetails: '',
        reminderSet: '',
        // Section 14: Portail assureur
        portalConsulted: '',
        docsDownloaded: '',
        docsIntegrated: '',
        docTypes: [],
        docTypesOther: '',
        // Section 15: Conformité
        compliance: [],
        additionalComments: ''
    });
    // État pour la progression du formulaire
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [generatedNote, setGeneratedNote] = useState('');
    // Options pour les différentes listes (version simplifiée)
    const options = {
        callReasons: ['Nouvelle soumission', 'Ajout/retrait véhicule', 'Modification de garanties', 'Renouvellement', 'Réclamation', 'Information générale', 'Autre'],
        interactionModes: ['Téléphone', 'En personne', 'Courriel', 'Visioconférence'],
        yesNo: ['Oui', 'Non'],
        clientNeeds: ['Meilleure protection', 'Réduction de prime', 'Modification du bien assuré', 'Clarification des garanties', 'Autre'],
        urgencies: ['Immédiate', 'Dans les 24h', 'Dans la semaine', 'Au renouvellement'],
        categories: ['Automobile', 'Habitation', 'Entreprise', 'Autre'],
        autoOperations: [
            'Nouvelle soumission',
            'Ajout de véhicule',
            'Retrait de véhicule',
            'Modification de véhicule',
            'Ajout de conducteur',
            'Retrait de conducteur',
            'Modification d\'usage',
            'Modification de garanties',
            'Renouvellement'
        ],
        homeOperations: [
            'Nouvelle soumission',
            'Modification de résidence',
            'Modification de garanties',
            'Ajout de biens spécifiques',
            'Retrait de biens spécifiques',
            'Renouvellement'
        ],
        priorities: ['Protection étendue', 'Budget limité', 'Valeur à neuf', 'Couverture spécifique'],
        changes: [
            'Aucun changement',
            'Changement d\'adresse',
            'Acquisition de nouveaux biens',
            'Changement de véhicule',
            'Changement dans le profil des conducteurs',
            'Rénovations',
            'Développement d\'activités commerciales à domicile',
            'Autre'
        ],
        autoRiskFactors: [
            'Aucune aggravation identifiée',
            'Conducteur novice',
            'Suspension/révocation antérieure',
            'Sinistres multiples',
            'Infractions graves',
            'Usage commercial non déclaré',
            'Modifications non standards',
            'Véhicule haute performance',
            'Conducteur non résident',
            'Zone à haut risque de vol',
            'Autre'
        ],
        homeRiskFactors: [
            'Aucune aggravation identifiée',
            'Résidence secondaire/saisonnière',
            'Bâtiment vacant >30 jours',
            'Activité commerciale à domicile',
            'Foyer au bois non certifié',
            'Zone inondable',
            'Toiture âgée',
            'Système électrique désuet',
            'Fréquence de sinistres',
            'Biens de valeur sans protection',
            'Animaux à risque',
            'Autre'
        ],
        autoProtections: [
            'Responsabilité civile',
            'Collision et versement',
            'Tous risques sauf collision',
            'Valeur à neuf',
            'Frais de déplacement',
            'Responsabilité pour véhicules loués',
            'Assurance de personnes',
            'Assistance routière',
            'TOUTES OFFERTES',
            'N/A',
            'Autres'
        ],
        homeProtections: [
            'Formule tous risques',
            'Formule risques désignés',
            'Dégâts d\'eau',
            'Inondation',
            'Tremblement de terre',
            'Valeur à neuf',
            'Biens de valeur',
            'Entreprises à domicile',
            'TOUTES OFFERTES',
            'N/A',
            'Autres'
        ],
        limitations: [
            'Exclusions standard',
            'Garantie vol',
            'Catastrophes naturelles',
            'Dommages préexistants',
            'Biens de valeur',
            'Activités commerciales',
            'Autres'
        ],
        confirmationMethods: ['Verbal', 'Écrit', 'Courriel', 'Signature électronique'],
        premiumTypes: ['Prime mensuelle', 'Prime annuelle', 'Prime annuelle avec taxe'],
        missingInfo: [
            'Aucune information manquante',
            'Permis de conduire',
            'Historique de conduite',
            'Preuves d\'absence de sinistres',
            'Photos du bien',
            'Évaluation professionnelle',
            'Certificat d\'inspection',
            'Inventaire des biens',
            'Factures d\'achat',
            'Autre'
        ],
        actions: [
            'Rappeler le client',
            'Envoyer documents par courriel',
            'Envoyer documents par courrier',
            'Attendre rappel du client',
            'Contacter assureur précédent',
            'Aucun suivi requis',
            'Autre'
        ],
        docTypes: ['Police d\'assurance', 'Avenants', 'Correspondance', 'Autre'],
        compliance: [
            'Analyse des besoins effectuée',
            'Conseils adaptés fournis',
            'Exclusions expliquées',
            'Rémunération divulguée',
            'Questions répondues',
            'Entretien documenté',
            'Obligations déontologiques respectées'
        ]
    };
    // Gestion des champs texte et select
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Gestion des cases à cocher
    const handleCheckboxChange = (e, category) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                [category]: [...formData[category], value]
            });
        } else {
            setFormData({
                ...formData,
                [category]: formData[category].filter(item => item !== value)
            });
        }
    };
    // Fonction pour passer à l'étape suivante
    const nextStep = (step) => {
        if (!completedSteps.includes(step)) {
            setCompletedSteps([...completedSteps, step]);
        }
        // Logique simplifiée pour déterminer l'étape suivante
        let next = step + 1;
        // Gérer les sections conditionnelles
        if (step === 4 || step === 6 || step === 7) {
            // Pour ces étapes, la logique conditionnelle serait ajoutée ici
            // mais pour simplifier, on passe simplement à l'étape suivante
        }
        setCurrentStep(next);
    };
    // Fonction pour revenir à l'étape précédente
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    // Générer la note en temps réel
    useEffect(() => {
        generateNote();
    }, [formData, completedSteps]);
    // Fonction pour générer la note
    const generateNote = () => {
        const date = new Date().toLocaleDateString('fr-FR');
        let note = `PROBATIO - NOTES D'INTERACTION - ${date}\n\n`;
        // Sections générées dynamiquement selon les étapes complétées
        if (completedSteps.includes(1)) {
            note += `1. IDENTIFICATION DE L'INTERACTION\n`;
            note += ` • Raison de l'appel: ${formData.callReason}\n`;
            note += ` • Nom de l'intervenant: ${formData.agentName}\n`;
            note += ` • Mode d'interaction: ${formData.interactionMode}\n\n`;
        }
        if (completedSteps.includes(2)) {
            note += `2. IDENTIFICATION DU CLIENT\n`;
            note += ` • Confirmation d'identité: ${formData.identityConfirmed}\n`;
            note += ` • Consentement à la collecte: ${formData.infoConsentGiven}\n`;
            note += ` • Consentement enregistré: ${formData.consentRecorded}\n\n`;
        }
        if (completedSteps.includes(3)) {
            note += `3. RÉSUMÉ DE LA REQUÊTE\n`;
            note += ` • Description: ${formData.requestSummary}\n`;
            if (formData.clientNeeds.length > 0) {
                note += ` • Besoins exprimés: ${formData.clientNeeds.join(', ')}\n`;
            }
            note += ` • Attentes spécifiques: ${formData.specificExpectations}\n`;
            note += ` • Urgence: ${formData.requestUrgency}\n\n`;
        }
        // Autres sections seraient ajoutées ici de façon similaire
        setGeneratedNote(note);
    };
    // Afficher une section complétée (format résumé)
    const renderCompletedSection = (step, title, summary) => (
        <div
            className="p-3 bg-white rounded-lg shadow-sm mb-2 border-l-4 border-green-500
cursor-pointer hover:bg-gray-50 transition-all"
            onClick={() => setCurrentStep(step)}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-700">{title}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1
rounded-full">Complété</span>
            </div>
            <div className="text-sm text-gray-600 mt-1 truncate">{summary}</div>
        </div>
    );
    // Composant réutilisable pour les groupes de cases à cocher
    const CheckboxGroup = ({ options, category, values, onChange }) => (
        <div className="grid grid-cols-2 gap-1 mt-1">
            {options.map(option => (
                <div key={option} className="flex items-start">
                    <input
                        type="checkbox"
                        id={`${category}-${option}`}
                        value={option}
                        checked={values.includes(option)}
                        onChange={(e) => onChange(e, category)}
                        className="mt-1 mr-2"
                    />
                    <label htmlFor={`${category}-${option}`} className="text-sm">{option}</label>
                </div>
            ))}
        </div>
    );
    // Boutons de navigation entre étapes
    const NavigationButtons = () => (
        <div className="flex justify-between mt-4">
            <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                disabled={currentStep === 1}
            >
                Retour
            </button>
            <button
                onClick={() => nextStep(currentStep)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Continuer
            </button>
        </div>
    );
    // Fonction pour obtenir le résumé d'une section
    const getSectionSummary = (step) => {
        switch (step) {
            case 1:
                return `${formData.callReason} | ${formData.agentName}`;
            case 2:
                return `ID confirmée: ${formData.identityConfirmed} | Consentement:
${formData.infoConsentGiven}`;
            case 3:
                return formData.requestSummary.substring(0, 50) + (formData.requestSummary.length >
                    50 ? '...' : '');
            // Autres cas seraient ajoutés de façon similaire
            default:
                return "Section complétée";
        }
    };
    // Rendu de l'étape active
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <h2 className="text-lg font-semibold text-blue-700 mb-3">1. Identification de
                            l'interaction</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Raison de l'appel:</label>
                            <select
                                name="callReason"
                                value={formData.callReason}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner...</option>
                                {options.callReasons.map(reason => (
                                    <option key={reason} value={reason}>{reason}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Nom de l'intervenant:</label>
                            <input
                                type="text"
                                name="agentName"
                                value={formData.agentName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Mode d'interaction:</label>
                            <select
                                name="interactionMode"
                                value={formData.interactionMode}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner...</option>
                                {options.interactionModes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>
                        </div>
                        <NavigationButtons />
                    </div>
                );
            case 2:
                return (
                    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <h2 className="text-lg font-semibold text-blue-700 mb-3">2. Identification du
                            client</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Confirmation d'identité
                                effectuée:</label>
                            <select
                                name="identityConfirmed"
                                value={formData.identityConfirmed}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner...</option>
                                {options.yesNo.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">*Obligatoire pour toute modification au
                                dossier</p>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Consentement à la collecte
                                d'information:</label>
                            <select
                                name="infoConsentGiven"
                                value={formData.infoConsentGiven}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner...</option>
                                {options.yesNo.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">*En cas de refus, expliquer les
                                conséquences au client</p>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Consentement enregistré au
                                dossier:</label>
                            <select
                                name="consentRecorded"
                                value={formData.consentRecorded}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner...</option>
                                {options.yesNo.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <NavigationButtons />
                    </div>
                );
            case 3:
                return (
                    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <h2 className="text-lg font-semibold text-blue-700 mb-3">3. Résumé de la
                            requête</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Description sommaire:</label>
                            <textarea
                                name="requestSummary"
                                value={formData.requestSummary}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Besoins exprimés par le
                                client:</label>
                            <CheckboxGroup
                                options={options.clientNeeds}
                                category="clientNeeds"
                                values={formData.clientNeeds}
                                onChange={handleCheckboxChange}
                            />
                            {formData.clientNeeds.includes('Autre') && (
                                <input
                                    type="text"
                                    name="clientNeedsOther"
                                    value={formData.clientNeedsOther}
                                    onChange={handleInputChange}
                                    placeholder="Précisez..."
                                    className="w-full p-2 border rounded mt-2"
                                />
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Attentes spécifiques du
                                client:</label>
                            <input
                                type="text"
                                name="specificExpectations"
                                value={formData.specificExpectations}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Urgence de la demande:</label>
                            <select
                                name="requestUrgency"
                                value={formData.requestUrgency}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner...</option>
                                {options.urgencies.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <NavigationButtons />
                    </div>
                );
            // Autres étapes...
            default:
                return (
                    <div className="p-4 bg-white rounded-lg shadow-md mb-4 text-center">
                        <h2 className="text-lg font-semibold text-blue-700 mb-3">Section en
                            développement</h2>
                        <p>Cette section sera bientôt disponible.</p>
                        <NavigationButtons />
                    </div>
                );
        }
    };
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-xl font-bold text-center mb-6 text-blue-800">PROBATIO - Formulaire
                Progressif</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne gauche - Formulaire progressif */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Formulaire</h2>
                    {/* Sections complétées */}
                    {completedSteps.map(step => {
                        const titles = {
                            1: "1. Identification de l'interaction",
                            2: "2. Identification du client",
                            3: "3. Résumé de la requête",
                            4: "4. Type de transaction",
                            5: "5. Analyse des besoins",
                            6: "6. Aggravations de risques",
                            7: "7. Protections et garanties",
                            8: "8. Renouvellement",
                            9: "9. Particularités pertinentes",
                            10: "10. Recommandations",
                            11: "11. Information sur les frais",
                            12: "12. Informations manquantes",
                            13: "13. Suivi",
                            14: "14. Information du portail assureur",
                            15: "15. Déclaration de conformité"
                        };
                        return renderCompletedSection(step, titles[step], getSectionSummary(step));
                    })}
                    {/* Section active */}
                    {renderCurrentStep()}
                </div>
                {/* Colonne droite - Aperçu de la note générée */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Aperçu de la note générée</h2>
                    <div className="bg-white rounded-lg shadow-md p-4 h-[600px] overflow-y-auto">
                        <pre className="text-sm font-mono whitespace-pre-wrap">{generatedNote}</pre>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedNote)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Copier la note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProbatioForm;