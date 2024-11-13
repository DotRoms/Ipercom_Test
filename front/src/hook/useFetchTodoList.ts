import { useEffect, useState } from "react";

import { VerifyIfUserExistWithToken } from "../actions/VerifyIfUserExistWhitToken";

import { ApiService } from "../services/apiServices";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export const useFetchTodoList = () => {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function for fetching the todo list
    const fetchTodoList = async (userId: string) => {

        try {
            setLoading(true);
            setError(null);
            const data = await ApiService.get(`/Task?userId=${userId}`);
            setTodoList(data);

        } catch (error) {
            setError("Erreur lors de la récupération des données");
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };



    // Use this useEffect to fetch the todo list when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            const userId = await VerifyIfUserExistWithToken();
            if (userId) {
                fetchTodoList(userId);
            }
        };
        fetchData();
    }, []);

    return {
        todoList,
        loading,
        error,
        setTodoList,
    };
};
