"use client";

import { useMutation } from "@apollo/client";
import { client } from "../ApolloWrapper";
import { useState } from "react";
import { ADD_TODO, GET_ALL_TODOS } from "../queries";

export default function Form() {
  const [addTodoMutation, { reset }] = useMutation(ADD_TODO, {
    refetchQueries: [GET_ALL_TODOS],
  });
  const [textInput, setTextInput] = useState("");

  const addTodo = async (_: any) => {
    if (textInput.trim() === "") return;
    try {
      await addTodoMutation({
        variables: { title: textInput },
      });
      setTextInput("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
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
          onChange={(e) => setTextInput(e.target.value)}
          value={textInput}
          placeholder="Add a todo"
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md hover:bg-blue-400 px-5"
        >
          Add
        </button>
      </div>
    </form>
  );
}
