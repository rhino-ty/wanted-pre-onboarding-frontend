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
          <ListH1Title>Todo List</ListH1Title>
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
                      <ListTitle isCompleted={todo.isCompleted}>{todo.todo}</ListTitle>
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
              <Nothing>할 일이 없습니다.</Nothing>
            )}
          </ListUl>
          <NewTodoContainer>
            <NewTodoTextField
              data-testid="new-todo-input"
              type="text"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
              onKeyPress={handleNewTodoEnterPress}
            />
            <NewTodoButton data-testid="new-todo-add-button" onClick={handleNewTodoSubmit}>
              추가
            </NewTodoButton>
          </NewTodoContainer>
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
  padding: 32px 10px 0 10px;
  max-width: 600px;
  width: 100%;
`;

const ListH1Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const ListTitle = styled.span<{ isCompleted: boolean }>`
  font-size: 1.2rem;
  margin: 8px 0;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  color: ${(props) => (props.isCompleted ? "#999" : "inherit")};

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Nothing = styled.span`
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
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
  width: 100%;
`;

const ListButton = styled(Button)`
  margin-right: 8px;
  height: 56px;
`;

const NewTodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0 32px 0;
`;

const NewTodoTextField = styled(TextField)`
  width: 100%;

  @media screen and (min-width: 481px) {
    width: 75%;
  }
`;

const NewTodoButton = styled(Button)`
  width: 100%;
  height: 56px;

  @media screen and (min-width: 481px) {
    width: 25%;
  }
`;
