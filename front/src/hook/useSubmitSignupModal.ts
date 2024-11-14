import { useState } from "react";

import { ControlInputValueOnSubmitSignupForm } from "../actions/ControlSubmitForm";

import { ApiService } from "../services/apiServices";


export const useSignupModal = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [successMessages, setSuccessMessages] = useState<
        string | null | undefined
    >();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const isValidData = await ControlInputValueOnSubmitSignupForm({
                formData,
                setErrorMessages,
            });
            if (isValidData) {
                const data = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                };

                const response = await ApiService.post("/User/signup", data);

                if (response) {
                    setErrorMessages([]);
                    setSuccessMessages(
                        `${response.name}, votre compte a bien été créé, vous pouvez vous connecter.`
                    );
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });
                }
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
