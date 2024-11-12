// import { ApiService } from "../services/apiServices";

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


export const deleteTask = (
    todoList: TodoItemProps[],
    setTodoList: (todos: TodoItemProps[]) => void
) => {
    const handleDeleteTask = async (id: string) => {
        const updatedTodos = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodos);

        // try {
        //     await ApiService.delete(`${endpoint}/${id}`);
        // } catch (error) {
        //     console.error("Error deleting task in DB:", error);
        //     setTodoList(todoList);
        // }
    };

    return { handleDeleteTask };
};

export const createTask = (
    todoList: TodoItemProps[],
    setTodoList: (todos: TodoItemProps[]) => void
) => {
    const addTask = (title: string) => {
        const newTask = {
            id: "", // Utilisation d'un ID temporaire
            title,
            completed: false,
        };
        setTodoList([...todoList, newTask]);

        // try {
        //     const createdTask = await ApiService.post(endpoint, { title, completed: false });
        //     setTodoList(currentTodos => currentTodos.map(todo => 
        //         todo.id === newTask.id ? { ...todo, id: createdTask.id } : todo
        //     ));
        // } catch (error) {
        //     console.error("Error creating task in DB:", error);
        //     setTodoList(todoList); // Annuler en cas d'erreur
        // }
    };

    return { addTask };
};
