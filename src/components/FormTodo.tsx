import axios from "axios";
import React, { useState } from "react";
import { TodoType } from "../../types/types";

type FormDataType = {
  setAllTodos: (data: TodoType[]) => void;
};

function FormTodo({ setAllTodos }: FormDataType) {
  const [todoData, setTodoData] = useState({ title: "", category: "" });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todoData.category === "" || todoData.title.trim() === "") {
      return;
    }
    const { data } = await axios.post("/api/todos", todoData);
    setAllTodos(data.todos);
  };

  return (
    <form
      onSubmit={formHandler}
      className=" flex flex-col w-3/4 items-center mx-auto space-y-3 px-4 "
    >
      <input
        className="bg-primary-300/40 px-4 py-3 rounded-md w-full  text-gray-700 focus:outline-none"
        name="title"
        onChange={changeHandler}
        value={todoData.title}
        type="text"
        placeholder="add Title ..."
      />
      <select
        className="bg-primary-300/40 px-4 py-3 rounded-md w-full text-gray-700 appearance-none focus:outline-none"
        name="category"
        onChange={changeHandler}
        value={todoData.category}
      >
        <option value="">select category</option>
        <option value="back-end">Back-End</option>
        <option value="front-end">Front-End</option>
      </select>
      <button
        type="submit"
        className="bg-primary-500 text-white px-4 py-3 rounded-md w-full"
      >
        Add Todo
      </button>
    </form>
  );
}

export default FormTodo;
