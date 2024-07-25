import { MdDelete } from "react-icons/md";

export default function Todo({
  id,
  title,
  removeTodo,
  setTodoComplete,
  is_done,
}: {
  id: number;
  title: string;
  removeTodo: (id: number) => void;
  setTodoComplete: (id: number, complete: boolean) => void;
  is_done: boolean;
}) {
  return (
    <div className="flex flex-1 px-4 py-2 gap-5">
      <div className="flex gap-3 flex-1">
        <div className="flex justify-center items-center">
          <MdDelete
            onClick={() => removeTodo(id)}
            className="text-blue-500 cursor-pointer"
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
        onChange={() => setTodoComplete(id, !is_done)}
      />
    </div>
  );
}
