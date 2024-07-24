import { MdDelete } from "react-icons/md";

export default function Todo({
  id,
  title,
  removeTodo,
  setTodoComplete,
  isDone,
}: {
  id: number;
  title: string;
  removeTodo: (id: number) => void;
  setTodoComplete: (id: number) => void;
  isDone: boolean;
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
            textDecoration: isDone ? "line-through" : "none",
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
        onChange={() => setTodoComplete(id)}
      />
    </div>
  );
}
