import { useSubmitNewTask } from "../../../../hook/useSubmitNewTask";
import { TodoForm } from "../../../render/Main/Home/TodoForm";

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoFormLogicProps {
    todoList: TodoItemProps[]; // Typage correct pour la liste de tâches
    setTodoList: (todos: TodoItemProps[]) => void; // Typage pour la fonction de mise à jour de la liste
}


export const TodoFormLogic = ({todoList, setTodoList}: TodoFormLogicProps) => {

    // const {addTask} = createTask(setTodoList, todoList);
    const {formData, handleChange, handleSubmit, errorMessages} = useSubmitNewTask(todoList, setTodoList);

    return (
        <TodoForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} errorMessages={errorMessages}/>
    )
}