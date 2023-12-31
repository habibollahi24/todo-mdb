import axios from "axios";
import React, { useState } from "react";
import { TodoType } from "../../types/types";

type FormDataType = {
  setAllTodos: (data: TodoType[]) => void;
};

function FormTodo({ setAllTodos }: FormDataType) {
  const [todoData, setTodoData] = useState({ title: "", category: "" });

  const changeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
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
    setTodoData({ title: "", category: "" });
  };

  return (
    <form
      onSubmit={formHandler}
      className=" flex flex-col md:w-3/4  items-center mx-auto space-y-3  "
    >
      <textarea
        className="bg-primary-300/40 px-4 py-3 rounded-md w-full  text-gray-700 focus:outline-none"
        name="title"
        onChange={changeHandler}
        value={todoData.title}
        placeholder="add Title ..."
      />
      <select
        className="bg-primary-300/40 px-4 py-3 rounded-md w-full text-gray-700 appearance-none focus:outline-none"
        name="category"
        onChange={changeHandler}
        value={todoData.category}
      >
        <option value="">select category</option>
        <option value="code">Code</option>
        <option value="homeWork">Home Work</option>
        <option value="game">Game</option>
        <option value="debit">Debit</option>
        <option value="practice">Practice</option>
        <option value="buy">Buy</option>
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
