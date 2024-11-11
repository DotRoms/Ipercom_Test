import { useState } from "react";
import { ControlInputValueOnSubmitSignupForm } from "../actions/ControlSubmitSignupForm";
import { ApiService } from "../services/apiServices";

export const useSignupModal = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
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
        console.log("is submiting");
        try {

            const isValidData = await ControlInputValueOnSubmitSignupForm({formData, setErrorMessages});
            console.log(isValidData);
            if (isValidData) {
                const response = await ApiService.post("/", formData);
                if (response) {
                    console.log("is submiting");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return {
        formData,
        handleChange,
        handleSubmit,
        errorMessages
    };
};
