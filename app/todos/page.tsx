"use client";
import { useState } from "react";
import Todo from "../_components/Todo";

interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

export default function Page() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todoText, setTodoText] = useState<string>("");

  const addTodo = (e: any) => {
    e.preventDefault();
    if (todoText.trim() === "") return;
    setTodos((todos) => [
      ...todos,
      {
        id: Math.floor(Math.random() * 100),
        title: todoText,
        isDone: false,
      },
    ]);
    setTodoText("");
  };

  const removeTodo = (id: number) =>
    setTodos((todos) => {
      return [...todos].filter((todo) => todo.id !== id);
    });

  const setTodoComplete = (id: number) =>
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <form onSubmit={addTodo} className="inline-flex flex-col gap-2">
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
      <div className="min-w-80">
        {todos.map((todo: Todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            isDone={todo.isDone}
            removeTodo={removeTodo}
            id={todo.id}
            setTodoComplete={setTodoComplete}
          />
        ))}
      </div>
    </div>
  );
}
