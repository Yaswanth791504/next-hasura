"use client";
import Todo from "../_components/Todo";
import { useQuery } from "@apollo/client";
import { GET_ALL_TODOS } from "../queries";
import Form from "../_components/Form";

interface Todo {
  id: number;
  title: string;
  is_done: boolean;
}

export default function Page() {
  const { data, loading, error } = useQuery(GET_ALL_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <Form />
      <div className="min-w-80">
        {data.todos.map((todo: Todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            is_done={todo.is_done}
          />
        ))}
      </div>
    </div>
  );
}
