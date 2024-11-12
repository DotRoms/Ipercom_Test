import { useState } from "react";
import { ControlInputValueOnSubmitTaskForm } from "../actions/ControlSubmitForm";
import { ApiService } from "../services/apiServices";

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
}

export const useSubmitNewTask = (
    todoList: TodoItemProps[],
    setTodoList: (todos: TodoItemProps[]) => void
) => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: "",
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
            const isValidData = await ControlInputValueOnSubmitTaskForm({
                formData,
                setErrorMessages,
            });
            if (isValidData) {
                const response = await ApiService.post(
                    "/RoutePourAjouterUnetache",
                    formData
                );
                if (response) {
                    console.log("is submiting");
                    const newTask = {
                        id: response.data.id,
                        title: formData.title,
                        completed: false,
                    };
                    setTodoList([...todoList, newTask]);
                    setFormData({ title: "" });
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
        errorMessages,
    };
};
