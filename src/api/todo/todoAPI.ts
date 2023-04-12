import instance from "../axiosModul";

export interface Todo {
  isEditMode: boolean;
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface CreateTodoRequest {
  todo: string;
}

export const createTodo = async (todo: string): Promise<Todo> => {
  try {
    const response = await instance.post("/todos", { todo });
    const newTodo: Todo = response.data;
    return newTodo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await instance.get("/todos");
    const todos: Todo[] = response.data;
    return todos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export interface UpdateTodoRequest {
  todo: string;
  isCompleted: boolean;
}

export const updateTodo = async (id: number, todo: string, isCompleted: boolean): Promise<Todo> => {
  try {
    const response = await instance.put(`/todos/${id}`, { todo, isCompleted });
    const updatedTodo: Todo = response.data;
    return updatedTodo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTodo = async (id: number): Promise<string> => {
  try {
    const res = await instance.delete(`/todos/${id}`);

    if (res.status === 204) {
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
  return "fail";
};
