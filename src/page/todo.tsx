import { useEffect, useState } from "react";
import { Todo, createTodo, deleteTodo, getTodos, updateTodo } from "../api/todo/todoAPI";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

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
      <TodoListContainer>
        <Main>
          <ListTitle>Todo List</ListTitle>
          <ListUl>
            {todos.length !== 0 ? (
              todos.map((todo) =>
                todo.isEditMode ? (
                  <ListLi key={todo.id}>
                    <ListTextField
                      data-testid="modify-input"
                      type="text"
                      value={todo.todo}
                      onChange={(e) =>
                        setTodos((prevTodos) =>
                          prevTodos.map((prevTodo) =>
                            prevTodo.id === todo.id
                              ? { ...prevTodo, todo: e.target.value }
                              : prevTodo
                          )
                        )
                      }
                    />
                    <ListButton
                      data-testid="submit-button"
                      onClick={() => handleTodoUpdate(todo.id, todo.todo, todo.isCompleted)}
                    >
                      제출
                    </ListButton>
                    <ListButton
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
                    </ListButton>
                  </ListLi>
                ) : (
                  <ListLi key={todo.id}>
                    <ListCheckboxLabel>
                      <ListCheckbox
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={(e) => handleTodoUpdate(todo.id, todo.todo, e.target.checked)}
                      />
                      <ListTitle>{todo.todo}</ListTitle>
                    </ListCheckboxLabel>
                    <ListButton data-testid="modify-button" onClick={() => handleEditMode(todo.id)}>
                      수정
                    </ListButton>
                    <ListButton
                      data-testid="delete-button"
                      onClick={() => handleTodoDelete(todo.id)}
                    >
                      삭제
                    </ListButton>
                  </ListLi>
                )
              )
            ) : (
              <ListTitle>할 일이 없습니다.</ListTitle>
            )}
          </ListUl>
          <TodoListContainer>
            <ListTextField
              data-testid="new-todo-input"
              type="text"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
              onKeyPress={handleNewTodoEnterPress}
            />
            <ListButton data-testid="new-todo-add-button" onClick={handleNewTodoSubmit}>
              추가
            </ListButton>
          </TodoListContainer>
        </Main>
      </TodoListContainer>
    </>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

const ListTitle = styled.h1`
  font-size: 1rem;
`;

const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
`;

const ListCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
`;

const ListCheckbox = styled.input`
  margin-right: 16px;
  cursor: pointer;
`;

const ListTextField = styled(TextField)`
  margin-right: 16px;
`;

const ListButton = styled(Button)`
  margin-right: 8px;
`;
