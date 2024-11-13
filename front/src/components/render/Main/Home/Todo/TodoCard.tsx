import { DeleteIcon } from "../../../../UI/design-system/Icons/Icons";

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
    onToggle: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}

// TodoCard render component
// This component is used to display a task
export const TodoCard = ({
    id,
    title,
    completed,
    onToggle,
    handleDeleteTask,
}: TodoItemProps) => {

    return (
        <div className="w-full flex justify-center gap-4 items-center p-4 bg-white shadow-md rounded-lg mb-4">
            <input
                type="checkbox"
                id={id}
                checked={completed}
                onChange={() => onToggle(id)}
            />
            <p
                className={`flex-1 ${
                    completed ? "line-through text-gray-500" : "text-black"
                }`}
            >
                {title}
            </p>

            <div className="flex">
                <button onClick={() => handleDeleteTask(id)}>
                    <DeleteIcon size="25" color="red" />
                </button>
            </div>
        </div>
    );
};
