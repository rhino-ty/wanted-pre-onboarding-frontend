import { useEffect, useState } from "react";
import { Todo, createTodo, deleteTodo, getTodos, updateTodo } from "../api/todo/todoAPI";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
  const handleNewTodoEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNewTodoSubmit();
    }
  };

  const handleTodoUpdate = async (id: number, todo: string, isCompleted: boolean) => {
    const updatedTodo = await updateTodo(id, todo, isCompleted);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleTodoDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditMode = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditMode: true } : { ...todo, isEditMode: false }
      )
    );
  };

  return (
    <>
      <CssBaseline />
      <main>
        <h1>Todo List</h1>
        <ul>
          {todos.length !== 0 ? (
            todos.map((todo) =>
              todo.isEditMode ? (
                <li key={todo.id}>
                  <TextField
                    data-testid="modify-input"
                    type="text"
                    value={todo.todo}
                    onChange={(e) =>
                      setTodos((prevTodos) =>
                        prevTodos.map((prevTodo) =>
                          prevTodo.id === todo.id ? { ...prevTodo, todo: e.target.value } : prevTodo
                        )
                      )
                    }
                  />
                  <Button
                    data-testid="submit-button"
                    onClick={() => handleTodoUpdate(todo.id, todo.todo, todo.isCompleted)}
                  >
                    제출
                  </Button>
                  <Button
                    data-testid="cancel-button"
                    onClick={() =>
                      setTodos((prevTodos) =>
                        prevTodos.map((prevTodo) =>
                          prevTodo.id === todo.id ? { ...prevTodo, isEditMode: false } : prevTodo
                        )
                      )
                    }
                  >
                    취소
                  </Button>
                </li>
              ) : (
                <li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={(e) => handleTodoUpdate(todo.id, todo.todo, e.target.checked)}
                    />
                    <span>{todo.todo}</span>
                  </label>
                  <Button data-testid="modify-button" onClick={() => handleEditMode(todo.id)}>
                    수정
                  </Button>
                  <Button data-testid="delete-button" onClick={() => handleTodoDelete(todo.id)}>
                    삭제
                  </Button>
                </li>
              )
            )
          ) : (
            <span>할 일이 없습니다.</span>
          )}
        </ul>
        <div>
          <TextField
            data-testid="new-todo-input"
            type="text"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            onKeyUp={handleNewTodoEnterPress}
          />
          <Button data-testid="new-todo-add-button" onClick={handleNewTodoSubmit}>
            추가
          </Button>
        </div>
      </main>
    </>
  );
}
