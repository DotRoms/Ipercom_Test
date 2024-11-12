import { useState } from "react";
import { ControlInputValueOnSubmitLoginForm } from "../actions/ControlSubmitForm";
import { useAuthModal } from "../context/ModalContext";
import { useAuth } from "../context/userIsConnected";
import { ApiService } from "../services/apiServices";

export const useLoginModal = () => {
    const [successMessages, setSuccessMessages] = useState<
        string | null | undefined
    >();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { setOpenModal } = useAuthModal();
    const { handleConnectUser } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const isValidData = await ControlInputValueOnSubmitLoginForm({
                formData,
                setErrorMessages,
            });

            if (isValidData) {
                const response = await ApiService.post("/User/login", formData);
                if (response) {
                    setErrorMessages([]);
                    setSuccessMessages(`Vous êtes connecté`);
                    setFormData({
                        email: "",
                        password: "",
                    });
                }
                setOpenModal(false);
                handleConnectUser(response.token);
            }
        } catch (error) {
            console.log(error);
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
        successMessages,
    };
};
