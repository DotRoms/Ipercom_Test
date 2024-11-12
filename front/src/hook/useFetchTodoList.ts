import { useEffect, useState } from "react";
// import { ApiService } from "../services/apiServices";
import { task } from "../constants/fakeTask";
interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export const useFetchTodoList = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                setLoading(true);
                setError(null);
                // const data = await ApiService.get("/todos");
                const data = task
                if (data) {
                    setTodoList(data);
                }
            } catch (error) {
                setError("Erreur lors de la récupération des données");
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchingData();
    }, []);

    return {
        todoList,
        loading,
        error,
        setTodoList,
    };
};
