import { deleteTask } from "../../../../../actions/TaskCrud";
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

    // Fonction pour gérer la suppression
    const { handleDeleteTask } = deleteTask(id);

    const onDeleteClick = async () => {
        await handleDeleteTask(); // Delete task in DB

        // Udapte state after deletion
        setTodoList((prevTodoList) => prevTodoList.filter((task) => task.id !== id));
    };

    return (
        <TodoCard
            id={id}
            title={title}
            completed={completed}
            handleDeleteTask={onDeleteClick}
        />
    );
};
