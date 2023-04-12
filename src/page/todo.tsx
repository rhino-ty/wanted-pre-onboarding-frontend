import { useEffect, useState } from "react";
import { Todo, createTodo, getTodos, updateTodo } from "../api/todo/todoAPI";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const handleNewTodoSubmit = async () => {
    if (newTodo.trim() === "") {
      return;
    }
    const createdTodo = await createTodo(newTodo);
    setTodos((prevTodos) => [...prevTodos, createdTodo]);
    setNewTodo("");
  };

  const handleTodoUpdate = async (id: number, todo: string, isCompleted: boolean) => {
    const updatedTodo = await updateTodo(id, todo, isCompleted);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.length !== 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={(e) => handleTodoUpdate(todo.id, todo.todo, e.target.checked)}
                />
                <span>{todo.todo}</span>
              </label>
            </li>
          ))
        ) : (
          <span>할 일이 없습니다.</span>
        )}
      </ul>
      <div>
        <input
          data-testid="new-todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button data-testid="new-todo-add-button" onClick={handleNewTodoSubmit}>
          추가
        </button>
      </div>
    </div>
  );
}
