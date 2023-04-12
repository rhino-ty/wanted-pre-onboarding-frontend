import { useEffect, useState } from "react";
import { Todo, getTodos } from "../api/todo/todoAPI";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.length !== 0 ? (
        todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))
      ) : (
        <span>할 일이 없습니다.</span>
      )}
    </ul>
  );
}
