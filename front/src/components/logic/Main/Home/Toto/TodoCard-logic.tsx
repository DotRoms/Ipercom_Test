import { deleteTask, updateTask } from "../../../../../actions/TaskCrud";

import { TodoCard } from "../../../../render/Main/Home/Todo/TodoCard";

interface TodoProps {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoCardLogicProps {
    todo: TodoProps;
    todoList: TodoProps[];
    setTodoList: (todos: TodoProps[]) => void;
}

// TodoCardLogic logic component
// This component is used to manage the logic of the TodoCard component
export const TodoCardLogic = ({
    todo,
    todoList,
    setTodoList,
}: TodoCardLogicProps) => {

    const { id, title, completed } = todo; // Destructuring the todo object
    const { toggleTask } = updateTask(todoList, setTodoList); // Destructuring the toggleTask function for updating the task
    const { handleDeleteTask } = deleteTask(todoList, setTodoList); // Destructuring the handleDeleteTask function for deleting the task

    return (
        <TodoCard
            id={id}
            title={title}
            completed={completed}
            onToggle={toggleTask}
            handleDeleteTask={handleDeleteTask}
        />
    );
};
