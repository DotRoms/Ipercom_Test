import { deleteTask, updateTask } from '../../../../../actions/TaskCrud';
import { TodoCard } from '../../../../render/Main/Home/Todo/TodoCard';

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
export const TodoCardLogic = ({ todo, todoList, setTodoList }: TodoCardLogicProps) => {
    const { id, title, completed } = todo;
    const { toggleTask } = updateTask(todoList, setTodoList);
    const {handleDeleteTask} = deleteTask(todoList, setTodoList);

    return (
        
            <TodoCard id={id} title={title} completed={completed} onToggle={toggleTask} handleDeleteTask={handleDeleteTask}/>
        
    );
};