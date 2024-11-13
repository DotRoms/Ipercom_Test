import { useSubmitNewTask } from "../../../../../hook/useSubmitNewTask";

import { TodoForm } from "../../../../render/Main/Home/Todo/TodoForm";


interface TodoFormLogicProps {
    setTodoList: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

type TodoItemProps = {
    id: number;
    title: string;
    completed: boolean;
}

// TodoFormLogic logic component
// This component is used to manage the logic of the TodoForm component
export const TodoFormLogic = ({setTodoList}:TodoFormLogicProps ) => {

    // Destructuring const from useSubmitNewTask hook for return them to the TodoForm component
    const { formData, handleChange, handleSubmit, errorMessages, successMessage } = useSubmitNewTask();
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const newTask = await handleSubmit(e); // handleSubmit should return the new task
        if (newTask) {
            setTodoList((prevTodoList) => [...prevTodoList, newTask]); // Mise à jour de la liste
        }
    };
    
    return (
        <TodoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={onSubmit}
            errorMessages={errorMessages}
            successMessage={successMessage}
        />
    );
};
