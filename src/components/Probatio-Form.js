
import { useState, useEffect } from "react";

export default function Home() {
    // Main form state
    const [formData, setFormData] = useState({
        primaryReason: "",
        secondaryReason: "",
        clientName: "",
        interactionMode: "",
        identityConfirmed: false,
        collectionConsent: false,
        recordedConsent: false,
        requestSummary: "",
        clientNeeds: [],
        clientExpectations: "",
        requestUrgency: "",
        vehicleInfo: "",
        driversInfo: "",
        vehicleUsage: "",
        propertyAddress: "",
        residenceType: "",
        propertyCharacteristics: "",
        transactionInfo: "",
        transactionReason: "",
        premiumImpact: "",
        followUpActions: [],
        followUpDate: "",
        followUpResponsible: "",
        followUpDetails: "",
        autoReminder: false,
        professionalConfirmation: [],
    });

    // Visible sections based on selections
    const [activeSections, setActiveSections] = useState({
        identification: true,
        identificationClient: true,
        requete: false,
        transaction: false,
        vehicleDetails: false,
        propertyDetails: false,
        suivi: true,
        conformite: true,
    });

    // Generated note state
    const [generatedNote, setGeneratedNote] = useState("");

    // Update visible sections when primary/secondary reason changes
    useEffect(() => {
        if (formData.primaryReason && formData.secondaryReason) {
            // Auto submission/issue
            if (formData.primaryReason === "soumissionAuto") {
                setActiveSections({
                    ...activeSections,
                    requete: true,
                    transaction: true,
                    vehicleDetails: true,
                    propertyDetails: false,
                });
            }
            // Home submission/issue
            else if (formData.primaryReason === "soumissionHab") {
                setActiveSections({
                    ...activeSections,
                    requete: true,
                    transaction: true,
                    vehicleDetails: false,
                    propertyDetails: true,
                });
            }
            // Auto service
            else if (formData.primaryReason === "serviceAuto") {
                setActiveSections({
                    ...activeSections,
                    requete: true,
                    transaction: true,
                    vehicleDetails: true,
                    propertyDetails: false,
                });
            }
            // Home service
            else if (formData.primaryReason === "serviceHab") {
                setActiveSections({
                    ...activeSections,
                    requete: true,
                    transaction: true,
                    vehicleDetails: false,
                    propertyDetails: true,
                });
            }
            // Important note
            else if (formData.primaryReason === "noteImportante") {
                setActiveSections({
                    ...activeSections,
                    requete: true,
                    transaction: true,
                    vehicleDetails: false,
                    propertyDetails: false,
                });
            }
        }
    }, [formData.primaryReason, formData.secondaryReason]);

    // Generate note whenever form data changes
    useEffect(() => {
        generateNote();
    }, [formData]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle checkbox array changes (like clientNeeds)
    const handleCheckboxArrayChange = (name, value, isChecked) => {
        if (isChecked) {
            setFormData({
                ...formData,
                [name]: [...formData[name], value],
            });
        } else {
            setFormData({
                ...formData,
                [name]: formData[name].filter((item) => item !== value),
            });
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            primaryReason: "",
            secondaryReason: "",
            clientName: "",
            interactionMode: "",
            identityConfirmed: false,
            collectionConsent: false,
            recordedConsent: false,
            requestSummary: "",
            clientNeeds: [],
            clientExpectations: "",
            requestUrgency: "",
            vehicleInfo: "",
            driversInfo: "",
            vehicleUsage: "",
            propertyAddress: "",
            residenceType: "",
            propertyCharacteristics: "",
            transactionInfo: "",
            transactionReason: "",
            premiumImpact: "",
            followUpActions: [],
            followUpDate: "",
            followUpResponsible: "",
            followUpDetails: "",
            autoReminder: false,
            professionalConfirmation: [],
        });

        setActiveSections({
            identification: true,
            identificationClient: true,
            requete: false,
            transaction: false,
            vehicleDetails: false,
            propertyDetails: false,
            suivi: true,
            conformite: true,
        });
    };

    // Copy note to clipboard
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedNote);
            alert("Note copiée dans le presse-papiers!");
        } catch (error) {
            alert("Échec de la copie. Veuillez réessayer ou copier manuellement.");
        }
    };

    // Generate standardized note
    const generateNote = () => {
        if (!formData.primaryReason || !formData.clientName) {
            setGeneratedNote(
                "La note générée s'affichera ici. Complétez le formulaire pour générer une note."
            );
            return;
        }

        // Format current date
        const currentDate = new Date().toLocaleDateString("fr-FR");

        // Get interaction mode label
        let interactionModeLabel = "";
        switch (formData.interactionMode) {
            case "telephone":
                interactionModeLabel = "Téléphone";
                break;
            case "enPersonne":
                interactionModeLabel = "En personne";
                break;
            case "courriel":
                interactionModeLabel = "Courriel";
                break;
            case "visioconference":
                interactionModeLabel = "Visioconférence";
                break;
            case "clavardage":
                interactionModeLabel = "Clavardage";
                break;
            default:
                interactionModeLabel = formData.interactionMode;
        }

        // Create client needs text
        const clientNeedsLabels = {
            meilleureProtection: "Meilleure protection",
            reductionPrime: "Réduction de prime",
            modificationBien: "Modification du bien assuré",
            clarificationGaranties: "Clarification des garanties",
            autre: "Autre",
        };

        const clientNeedsText = formData.clientNeeds
            .map((need) => `- ${clientNeedsLabels[need] || need}`)
            .join("\n");

        // Build note title based on selected options
        let noteTitle = "NOTE STANDARD";

        if (formData.primaryReason === "soumissionAuto") {
            noteTitle = "NOTE - SOUMISSION AUTOMOBILE";
            if (formData.secondaryReason === "offreAuto") {
                noteTitle += " (OFFRE)";
            }
        } else if (formData.primaryReason === "soumissionHab") {
            noteTitle = "NOTE - SOUMISSION HABITATION";
            if (formData.secondaryReason === "offreHab") {
                noteTitle += " (OFFRE)";
            }
        } else if (formData.primaryReason === "serviceAuto") {
            if (formData.secondaryReason === "changementAdresseAuto") {
                noteTitle = "NOTE - CHANGEMENT D'ADRESSE (AUTOMOBILE)";
            } else if (formData.secondaryReason === "ajoutVehicule") {
                noteTitle = "NOTE - AJOUT D'UN VÉHICULE";
            } else if (formData.secondaryReason === "supprVehicule") {
                noteTitle = "NOTE - SUPPRESSION D'UN VÉHICULE";
            } else if (formData.secondaryReason === "resiliationAuto") {
                noteTitle = "NOTE - RÉSILIATION (AUTOMOBILE)";
            } else if (formData.secondaryReason === "separationAuto") {
                noteTitle = "NOTE - SÉPARATION (AUTOMOBILE)";
            } else {
                noteTitle = "NOTE - SERVICE AUTOMOBILE";
            }
        } else if (formData.primaryReason === "serviceHab") {
            if (formData.secondaryReason === "changementAdresseHab") {
                noteTitle = "NOTE - CHANGEMENT D'ADRESSE (HABITATION)";
            } else if (formData.secondaryReason === "ajoutResidence") {
                noteTitle = "NOTE - AJOUT D'UNE RÉSIDENCE";
            } else if (formData.secondaryReason === "supprSituation") {
                noteTitle = "NOTE - SUPPRESSION D'UNE SITUATION";
            } else if (formData.secondaryReason === "resiliationHab") {
                noteTitle = "NOTE - RÉSILIATION (HABITATION)";
            } else if (formData.secondaryReason === "separationHab") {
                noteTitle = "NOTE - SÉPARATION (HABITATION)";
            } else {
                noteTitle = "NOTE - SERVICE HABITATION";
            }
        } else if (formData.primaryReason === "noteImportante") {
            if (formData.secondaryReason === "procuration") {
                noteTitle = "NOTE IMPORTANTE - PROCURATION";
            } else if (formData.secondaryReason === "refusAssurance") {
                noteTitle = "NOTE IMPORTANTE - REFUS D'ASSURANCE";
            } else {
                noteTitle = "NOTE IMPORTANTE";
            }
        }

        // Create client identity section
        let clientIdentitySection = "";
        if (
            formData.identityConfirmed &&
            formData.collectionConsent &&
            formData.recordedConsent
        ) {
            clientIdentitySection =
                "Confirmation d'identité du client effectuée. Le client a consenti à la collecte d'information et ce consentement a été enregistré au dossier.";
        } else {
            clientIdentitySection =
                "ATTENTION: Confirmation d'identité ou consentements incomplets.";
        }

        // Create vehicle section if applicable
        let vehicleSection = "";
        if (activeSections.vehicleDetails && formData.vehicleInfo) {
            const vehicleUsageLabels = {
                plaisir: "Plaisir/Déplacements personnels",
                travail: "Transport au travail",
                commercial: "Usage commercial",
                autre: "Autre",
            };

            vehicleSection = `
DÉTAILS DU VÉHICULE:
Véhicule concerné: ${formData.vehicleInfo}
Conducteurs concernés: ${formData.driversInfo || "Non spécifié"}
Utilisation principale: ${vehicleUsageLabels[formData.vehicleUsage] ||
                formData.vehicleUsage ||
                "Non spécifiée"
                }`;
        }

        // Create property section if applicable
        let propertySection = "";
        if (activeSections.propertyDetails && formData.propertyAddress) {
            const residenceTypeLabels = {
                principale: "Principale",
                secondaire: "Secondaire",
                saisonniere: "Saisonnière",
                locataire: "Locataire",
                coproprietaire: "Copropriétaire",
            };

            propertySection = `
DÉTAILS DE LA PROPRIÉTÉ:
Adresse de la propriété: ${formData.propertyAddress}
Type de résidence: ${residenceTypeLabels[formData.residenceType] ||
                formData.residenceType ||
                "Non spécifié"
                }
Caractéristiques particulières: ${formData.propertyCharacteristics ||
                "Aucune caractéristique particulière"
                }`;
        }

        // Create transaction section if applicable
        let transactionSection = "";
        if (
            activeSections.transaction &&
            (formData.transactionInfo ||
                formData.transactionReason ||
                formData.premiumImpact)
        ) {
            const premiumImpactLabels = {
                augmentation: "Augmentation",
                diminution: "Diminution",
                neutre: "Neutre",
                nonApplicable: "Non applicable",
            };

            transactionSection = `
TRANSACTION:
Information complémentaire: ${formData.transactionInfo || "Non spécifié"}
Justification/motif: ${formData.transactionReason || "Non spécifié"}
Impact sur la prime: ${premiumImpactLabels[formData.premiumImpact] ||
                formData.premiumImpact ||
                "Non spécifié"
                }`;
        }

        // Create follow-up section
        let followUpSection = "";
        const followUpActionLabels = {
            rappelerClient: "Rappeler le client",
            envoyerDocsCourriel: "Envoyer documents par courriel",
            envoyerDocsCourrier: "Envoyer documents par courrier",
            attendreRappelClient: "Attendre rappel du client",
            contacterAssureurPrecedent: "Contacter assureur précédent",
            aucunSuivi: "Aucun suivi requis - dossier complet",
        };

        if (formData.followUpActions.includes("aucunSuivi")) {
            followUpSection = `
SUIVI REQUIS:
Aucun suivi requis - dossier complet.`;
        } else {
            const followUpActionsText = formData.followUpActions
                .map((action) => followUpActionLabels[action] || action)
                .join(", ");

            followUpSection = `
SUIVI REQUIS:
Actions requises: ${followUpActionsText || "Aucune action requise"}
Date de suivi prévue: ${formData.followUpDate || "Non spécifiée"}
Responsable du suivi: ${formData.followUpResponsible || "Non assigné"}
Précisions: ${formData.followUpDetails || "Aucune précision"}
Rappel automatique configuré: ${formData.autoReminder ? "Oui" : "Non"}`;
        }

        // Create professional declaration section
        let professionalSection = "";
        if (formData.professionalConfirmation.length > 0) {
            const profConfirmationLabels = {
                analyseBesoins: "Effectué une analyse sérieuse des besoins du client",
                conseilsAdaptes: "Fourni des conseils adaptés à la situation du client",
                exclusionsExpliquees:
                    "Expliqué clairement les exclusions et limitations",
                remunerationDivulguee: "Divulgué le mode de rémunération",
                questionsRepondues: "Répondu à toutes les questions du client",
                documentationComplete:
                    "Documenté de façon précise et complète l'entretien",
                deontologie: "Respecté toutes les obligations déontologiques",
            };

            const confirmationsText = formData.professionalConfirmation
                .map((conf) => `- ${profConfirmationLabels[conf] || conf}`)
                .join("\n");

            professionalSection = `
DÉCLARATION PROFESSIONNELLE:
Le représentant confirme avoir:
${confirmationsText}`;
        }

        // Compile the note
        const note = `${noteTitle}

Client: ${formData.clientName}
Date: ${currentDate}
Mode d'interaction: ${interactionModeLabel || "Non spécifié"}

IDENTIFICATION DU CLIENT:
${clientIdentitySection}

RÉSUMÉ DE LA DEMANDE:
${formData.requestSummary || "Non spécifié"}

BESOINS EXPRIMÉS:
${clientNeedsText || "Aucun besoin spécifique exprimé"}
Attentes spécifiques: ${formData.clientExpectations || "Non spécifiées"}
${vehicleSection}
${propertySection}
${transactionSection}
${followUpSection}
${professionalSection}`;

        setGeneratedNote(note);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <h1 className="text-3xl font-bold text-center mb-6">PROBATIO</h1>
            <h2 className="text-xl text-center mb-10">
                Générateur de Notes Standardisées
            </h2>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Form Side */}
                <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Formulaire</h3>

                    {/* Section 1: Identification */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h4 className="text-lg font-medium mb-3">
                            1. IDENTIFICATION DE L'INTERACTION
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Raison d'appel principale:
                                </label>
                                <select
                                    name="primaryReason"
                                    value={formData.primaryReason}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Sélectionner</option>
                                    <option value="soumissionAuto">
                                        Soumission/Émission automobile
                                    </option>
                                    <option value="soumissionHab">
                                        Soumission/Émission habitation
                                    </option>
                                    <option value="serviceAuto">
                                        Service/Fidélisation automobile
                                    </option>
                                    <option value="serviceHab">
                                        Service/Fidélisation habitation
                                    </option>
                                    <option value="noteImportante">Note importante</option>
                                </select>
                            </div>

                            {formData.primaryReason && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Raison d'appel secondaire:
                                    </label>
                                    <select
                                        name="secondaryReason"
                                        value={formData.secondaryReason}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">Sélectionner</option>
                                        {formData.primaryReason === "soumissionAuto" && (
                                            <>
                                                <option value="offreAuto">Offre</option>
                                                <option value="autreAuto">Autre</option>
                                            </>
                                        )}
                                        {formData.primaryReason === "soumissionHab" && (
                                            <>
                                                <option value="offreHab">Offre</option>
                                                <option value="autreHab">Autre</option>
                                            </>
                                        )}
                                        {formData.primaryReason === "serviceAuto" && (
                                            <>
                                                <option value="changementAdresseAuto">
                                                    Changement d'adresse
                                                </option>
                                                <option value="ajoutVehicule">
                                                    Ajout d'un véhicule
                                                </option>
                                                <option value="supprVehicule">
                                                    Suppression d'un véhicule
                                                </option>
                                                <option value="resiliationAuto">Résiliation</option>
                                                <option value="separationAuto">Séparation</option>
                                            </>
                                        )}
                                        {formData.primaryReason === "serviceHab" && (
                                            <>
                                                <option value="changementAdresseHab">
                                                    Changement d'adresse
                                                </option>
                                                <option value="ajoutResidence">
                                                    Ajout d'une résidence
                                                </option>
                                                <option value="supprSituation">
                                                    Suppression d'une situation
                                                </option>
                                                <option value="resiliationHab">Résiliation</option>
                                                <option value="separationHab">Séparation</option>
                                            </>
                                        )}
                                        {formData.primaryReason === "noteImportante" && (
                                            <>
                                                <option value="procuration">Procuration</option>
                                                <option value="refusAssurance">
                                                    Refus d'assurance
                                                </option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom du client:
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Nom du client"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mode d'interaction:
                                </label>
                                <select
                                    name="interactionMode"
                                    value={formData.interactionMode}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Sélectionner</option>
                                    <option value="telephone">Téléphone</option>
                                    <option value="enPersonne">En personne</option>
                                    <option value="courriel">Courriel</option>
                                    <option value="visioconference">Visioconférence</option>
                                    <option value="clavardage">Clavardage</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Identification du client */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h4 className="text-lg font-medium mb-3">
                            2. IDENTIFICATION DU CLIENT
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="identityConfirmed"
                                    name="identityConfirmed"
                                    checked={formData.identityConfirmed}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <label
                                    htmlFor="identityConfirmed"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Confirmation d'identité effectuée
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="collectionConsent"
                                    name="collectionConsent"
                                    checked={formData.collectionConsent}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <label
                                    htmlFor="collectionConsent"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Consentement à la collecte d'information
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="recordedConsent"
                                    name="recordedConsent"
                                    checked={formData.recordedConsent}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <label
                                    htmlFor="recordedConsent"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Consentement enregistré au dossier
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Résumé de la requête */}
                    {activeSections.requete && (
                        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                            <h4 className="text-lg font-medium mb-3">
                                3. RÉSUMÉ DE LA REQUÊTE
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description sommaire:
                                    </label>
                                    <textarea
                                        name="requestSummary"
                                        value={formData.requestSummary}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md h-24"
                                        placeholder="Description de la requête du client..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Besoins exprimés par le client:
                                    </label>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="need-meilleureProtection"
                                                checked={formData.clientNeeds.includes(
                                                    "meilleureProtection"
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxArrayChange(
                                                        "clientNeeds",
                                                        "meilleureProtection",
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label
                                                htmlFor="need-meilleureProtection"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                Meilleure protection
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="need-reductionPrime"
                                                checked={formData.clientNeeds.includes(
                                                    "reductionPrime"
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxArrayChange(
                                                        "clientNeeds",
                                                        "reductionPrime",
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label
                                                htmlFor="need-reductionPrime"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                Réduction de prime
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="need-modificationBien"
                                                checked={formData.clientNeeds.includes(
                                                    "modificationBien"
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxArrayChange(
                                                        "clientNeeds",
                                                        "modificationBien",
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label
                                                htmlFor="need-modificationBien"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                Modification du bien assuré
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="need-clarificationGaranties"
                                                checked={formData.clientNeeds.includes(
                                                    "clarificationGaranties"
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxArrayChange(
                                                        "clientNeeds",
                                                        "clarificationGaranties",
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label
                                                htmlFor="need-clarificationGaranties"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                Clarification des garanties
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="need-autre"
                                                checked={formData.clientNeeds.includes("autre")}
                                                onChange={(e) =>
                                                    handleCheckboxArrayChange(
                                                        "clientNeeds",
                                                        "autre",
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label
                                                htmlFor="need-autre"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                Autre
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </div>

                {/* Note Preview Side */}
                <div className="lg:w-1/2">
                    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 h-full flex flex-col">
                        <h3 className="text-xl font-bold mb-4">
                            Prévisualisation de la Note
                        </h3>

                        <div className="flex-grow p-4 bg-gray-700 rounded-md font-mono whitespace-pre-wrap overflow-y-auto text-sm">
                            {generatedNote}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                disabled={!generatedNote}
                            >
                                Copier la note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
