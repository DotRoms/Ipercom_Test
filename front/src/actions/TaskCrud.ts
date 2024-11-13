import { VerifyIfUserExistWithToken } from "../actions/VerifyIfUserExistWhitToken";
import { ApiService } from "../services/apiServices";

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
}

export const updateTask = (
    // endpoint: string,
    todoList: TodoItemProps[],
    setTodoList: (todos: TodoItemProps[]) => void
) => {
    const toggleTask = async (id: string) => {
        const updatedTodos = todoList.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodoList(updatedTodos);

        // const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
        // if (todoToUpdate) {
        //     try {
        //         await ApiService.put(`${endpoint}/${id}`, {
        //             completed: todoToUpdate.completed,
        //         });
        //     } catch (error) {
        //         console.error("Error updating task in DB:", error);
        //         setTodoList(todoList);
        //     }
        // }
    };

    return { toggleTask };
};

export const deleteTask = (taskId: number) => {
    
    const handleDeleteTask = async () => {
        
        const userId = await VerifyIfUserExistWithToken();

        // Si l'utilisateur ou la tâche n'existe pas, on ne tente pas de supprimer
        if (!userId || !taskId) {
            console.error("User or Task ID is missing");
            return;
        }

        try {
            // Passer les identifiants via l'URL (recommandation pour une requête DELETE)
            const response = await ApiService.delete(`/Task/delete?userId=${userId}&taskId=${taskId}`);
           return response;
        } catch (error) {
            console.error("Error deleting task in DB:", error);
        }
    };

    return { handleDeleteTask };
};
