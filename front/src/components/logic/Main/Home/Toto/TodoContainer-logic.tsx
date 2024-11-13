import { useFetchTodoList } from "../../../../../hook/useFetchTodoList";

import { TodoContainer } from "../../../../render/Main/Home/Todo/TodoContainer";

// TodoContainerLogic logic component
// This component is the logic component of the TodoContainer component
export const TodoContainerLogic = () => {

    const { todoList, loading, error, setTodoList } = useFetchTodoList(); // Dessctructuring the todoList, loading, error and setTodoList from the useFetchTodoList hook for return them to the TodoContainer component

    return (
        <TodoContainer
            todoList={todoList}
            loading={loading}
            error={error}
            setTodoList={setTodoList}
        />
    );
};
