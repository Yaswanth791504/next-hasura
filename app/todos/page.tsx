"use client";
import { useEffect, useState } from "react";
import Todo from "../_components/Todo";
import {
  addTodoToHasura,
  deleleTodoFromHasura,
  getTodosFromHasura,
  updateTodoInHasura,
} from "./api/route";

export interface TodoInterface {
  id: number;
  title: string;
  is_done: boolean;
}

export default function Page() {
  const [todos, setTodos] = useState<Array<TodoInterface>>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getTodosFromHasura()
      .then((todos: Array<TodoInterface>) => setTodos(todos))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async (formdata: any) => {
    const todoText = formdata.get("todo");
    if (todoText.trim() === "") return;
    const newTodo: TodoInterface = await addTodoToHasura(todoText);
    console.log(newTodo);
    setTodoText("");
    setTodos((todos) => [...todos, newTodo]);
  };

  const removeTodo = async (id: number) => {
    await deleleTodoFromHasura(id);
    setTodos((todos) => {
      return [...todos].filter((todo) => todo.id !== id);
    });
  };

  const setTodoComplete = async (id: number, complete: boolean) => {
    await updateTodoInHasura(id, complete);
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, is_done: complete } : todo
      )
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24 gap-5">
      <form action={addTodo} className="inline-flex flex-col gap-2">
        <label htmlFor="todo" className="text-blue-500 font-semibold">
          Todo
        </label>
        <div className="flex flex-row gap-3 rounded-md border-2 border-blue-500 pr-2 py-2 overflow-hidden">
          <input
            className="px-4 py-2 outline-0 border-0 text-blue-500"
            name="todo"
            id="todo"
            type="text"
            value={todoText}
            autoComplete="off"
            placeholder="Add new todo"
            onChange={(e: any) => setTodoText(e.target.value)}
          />

          <button
            type="submit"
            className=" bg-blue-500 text-white rounded-md hover:bg-blue-400 px-5"
          >
            Add
          </button>
        </div>
      </form>
      {loading && <h2 className="text-blue-500">Loading...</h2>}
      {todos.length === 0 && !loading && (
        <h2 className="text-blue-500">No todos</h2>
      )}
      <div className="min-w-80">
        {todos ? (
          todos.map((todo: TodoInterface) => (
            <Todo
              key={todo?.id}
              title={todo?.title}
              is_done={todo?.is_done}
              removeTodo={removeTodo}
              id={todo?.id}
              setTodoComplete={setTodoComplete}
            />
          ))
        ) : (
          <div>
            <h1>no todos</h1>
          </div>
        )}
      </div>
    </div>
  );
}
