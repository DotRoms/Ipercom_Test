import { Container } from "../../../../UI/design-system/container/Container";

import { TodoCardLogic } from "../../../../logic/Main/Home/Toto/TodoCard-logic";
import { TodoFormLogic } from "../../../../logic/Main/Home/Toto/TodoForm-logic";

type TodoItemProps = {
    id: number;
    title: string;
    completed: boolean;
};

interface TodoContainerProps {
    todoList: TodoItemProps[];
    error: string | null;
    loading: boolean;
    setTodoList: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

// TodoContainer render component
// This component is used to display the list of tasks
export const TodoContainer = ({
    todoList,
    error,
    loading,
    setTodoList,
}: TodoContainerProps) => {
    if (loading) {
        return (
            <Container>
                <h3>Loading...</h3>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <h3>Erreur: {error}</h3>
            </Container>
        );
    }

    return (
        <Container>
            <h3 className="text-center mb-8 text-2xl">Ma liste de tâches.</h3>

            <TodoFormLogic setTodoList={setTodoList} />

            <div className="flex flex-col w-full">
                {todoList.map((todo: TodoItemProps, index: number) => (
                    <TodoCardLogic
                        key={index}
                        todo={todo}
                        setTodoList={setTodoList}
                    />
                ))}
            </div>
        </Container>
    );
};
