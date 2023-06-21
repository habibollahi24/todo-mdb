import React from "react";
import axios from "axios";
import { TodoType } from "../../types/types";
import Link from "next/link";
import { useRouter } from "next/router";

type TodoProps = {
  todo: TodoType;
  setTodosList?: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

function Todo({ todo, setTodosList }: TodoProps) {
  const router = useRouter();
  const deletTodo = async (id: string) => {
    const { data } = await axios.delete<{ todos: TodoType[] }>(
      `/api/todos/${id}`
    );
    setTodosList?.(data.todos);
    router.push("/");
  };
  const editTodo = async (id: string) => {
    router.push(`/todo/edit/${id}`);
  };

  const completedHandler = async (id: string) => {
    const { data } = await axios.put(`/api/todos/complete/${id}`);
    console.log(data);
    setTodosList?.(data.todos);
  };

  return (
    <div className="flex flex-col  relative overflow-hidden justify-between items-start h-40   bg-primary-300/20 rounded-md p-2  mb-4">
      <div className="text-gray-700 text-xl">
        <Link href={`/todo/${todo._id}`}>{todo.title}</Link>
      </div>
      <div className="space-x-3 absolute right-2 bottom-2">
        <button
          onClick={() => completedHandler(todo._id)}
          className="inline-block text-xs"
        >
          {todo.isCompleted ? "Complete" : "UnComplete"}
        </button>
        <button
          onClick={() => editTodo(todo._id)}
          className="text-sm text-white bg-primary-500 rounded-md p-2"
        >
          Edit
        </button>
        <button
          onClick={() => deletTodo(todo._id)}
          className="text-sm text-white bg-danger/80 rounded-md p-2"
        >
          Delete
        </button>
      </div>
      <div className="absolute  top-0 px-5  right-0 bg-primary-300 p-[4px] text-white text-xs">
        {todo.category}
      </div>
    </div>
  );
}

export default Todo;
