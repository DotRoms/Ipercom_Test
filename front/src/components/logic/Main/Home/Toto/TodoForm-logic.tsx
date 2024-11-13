import { useSubmitNewTask } from "../../../../../hook/useSubmitNewTask";

import { TodoForm } from "../../../../render/Main/Home/Todo/TodoForm";

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoFormLogicProps {
    todoList: TodoItemProps[];
    setTodoList: (todos: TodoItemProps[]) => void;
}

// TodoFormLogic logic component
// This component is used to manage the logic of the TodoForm component
export const TodoFormLogic = ({
    todoList,
    setTodoList,
}: TodoFormLogicProps) => {

    // Destructuring const from useSubmitNewTask hook for return them to the TodoForm component
    const { formData, handleChange, handleSubmit, errorMessages } =
        useSubmitNewTask(todoList, setTodoList);

    return (
        <TodoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errorMessages={errorMessages}
        />
    );
};
