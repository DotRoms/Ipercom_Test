import { deleteTask, updateTask } from "../../../../../actions/TaskCrud";

import { TodoCard } from "../../../../render/Main/Home/Todo/TodoCard";

// Importer le type TodoItemProps si nécessaire
type TodoItemProps = {
    id: number;
    title: string;
    completed: boolean;
};

interface TodoCardProps {
    todo: TodoItemProps;
    setTodoList: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

export const TodoCardLogic = ({ todo, setTodoList }: TodoCardProps) => {
    const { id, title, completed } = todo;

    const { handleDeleteTask } = deleteTask(id);
    const { handleUpdateTask } = updateTask(id);

    const onDeleteClick = async () => {
        await handleDeleteTask(); // Delete task in DB
        // Udapte state after deletion
        setTodoList((prevTodoList) =>
            prevTodoList.filter((task) => task.id !== id)
        );
    };

    const onUpdateClick = async () => {
        const updatedTaskData = await handleUpdateTask(); // Update task in DB
        // Update state after modification
        console.log(updatedTaskData);
        setTodoList((prevTodoList) =>
            prevTodoList.map(
                (task) =>
                    task.id === id ? { ...task, ...updatedTaskData } : task // Mettez à jour la tâche modifiée
            )
        );
    };

    return (
        <TodoCard
            id={id}
            title={title}
            completed={completed}
            handleDeleteTask={onDeleteClick}
            handleUpdateTask={onUpdateClick}
        />
    );
};
