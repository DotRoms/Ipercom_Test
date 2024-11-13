import { useState } from "react";

import { ControlInputValueOnSubmitTaskForm } from "../actions/ControlSubmitForm";
import { VerifyIfUserExistWithToken } from "../actions/VerifyIfUserExistWhitToken";

import { ApiService } from "../services/apiServices";

// Hook pour soumettre une nouvelle tâche
export const useSubmitNewTask = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]); // Messages d'erreur
    const [successMessage, setSuccessMessage] = useState<string>(""); // Message de succès
    const [formData, setFormData] = useState({
        title: "",
    });

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        // Réinitialiser les messages d'erreur à chaque soumission
        setErrorMessages([]);
        setSuccessMessage("");

        try {
            // Valider les données avant de soumettre
            const isValidData = await ControlInputValueOnSubmitTaskForm({
                formData,
                setErrorMessages,
            });

            if (isValidData) {
                // Vérifier si l'utilisateur est authentifié et récupérer son ID
                const userId = await VerifyIfUserExistWithToken();

                if (!userId) {
                    // Si aucun userId n'est trouvé, afficher une erreur
                    setErrorMessages([
                        "Utilisateur non connecté ou session expirée",
                    ]);
                    return;
                }

                const newFormData = {
                    userId: userId,
                    title: formData.title,
                };

                // Envoyer la nouvelle tâche au serveur
                const response = await ApiService.post(
                    `/Task/add/`,
                    newFormData
                );

                if (response) {
                    setSuccessMessage("Tâche ajoutée avec succès");
                    setFormData({ title: "" });
                    return response; // return the new task for update the list on the parent component
                }
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error && error.message) {
                setErrorMessages([error.message]);
            } else {
                setErrorMessages(["An unknown error occurred."]);
            }
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        errorMessages,
        successMessage,
    };
};
