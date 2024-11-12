import { useFetchTodoList } from "../../../../hook/useFetchTodoList"
import { TodoContainer } from "../../../render/Main/Home/TodoContainer"

export const TodoContainerLogic = () => {

    const {todoList, loading, error, setTodoList} = useFetchTodoList()

    return (
        <TodoContainer todoList={todoList} loading={loading} error={error} setTodoList={setTodoList}/>
    )
}