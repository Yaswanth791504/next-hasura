"use client";
import { useMutation } from "@apollo/client";
import { MdDelete } from "react-icons/md";
import { DELETE_TODO, GET_ALL_TODOS, TOGGLE_TODO } from "../queries";

export default function Todo({
  id,
  title,
  is_done,
}: {
  id: number;
  title: string;
  removeTodo?: (id: number) => void;
  setTodoComplete?: (id: number) => void;
  is_done: boolean;
}) {
  const [toggleTodoMutation] = useMutation(TOGGLE_TODO, {
    refetchQueries: [GET_ALL_TODOS],
  });
  const [deleteTodoMutation] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_ALL_TODOS],
  });

  return (
    <div className="flex flex-1 px-4 py-2 gap-5">
      <div className="flex gap-3 flex-1">
        <div className="flex justify-center items-center">
          <MdDelete
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              deleteTodoMutation({ variables: { id } });
              console.log("refetching");
            }}
          />
        </div>
        <h1
          className="flex flex-1 text-blue-500"
          style={{
            textDecoration: is_done ? "line-through" : "none",
            textDecorationColor: "#3b82f6",
          }}
        >
          {title}
        </h1>
      </div>
      <input
        type="checkbox"
        name=""
        id=""
        checked={is_done}
        onChange={() => {
          toggleTodoMutation({ variables: { id, is_done: !is_done } });
        }}
      />
    </div>
  );
}
