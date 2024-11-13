// import { deleteTask, updateTask } from "../../../../../actions/TaskCrud";

import { TodoCard } from "../../../../render/Main/Home/Todo/TodoCard";

type TodoProps = {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoCardProps {
    todo: TodoProps;
}

// TodoCardLogic logic component
// This component is used to manage the logic of the TodoCard component
export const TodoCardLogic = ({ todo }: TodoCardProps) => {

    const { id, title, completed } = todo; // Destructuring the todo object

    return <TodoCard id={id} title={title} completed={completed} />;
};
