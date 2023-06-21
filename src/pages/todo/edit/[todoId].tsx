import axios from "axios";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { TodoType } from "../../../../types/types";
import { getOneTodoFrmDB } from "../../api/todos/[todoId]";
import Link from "next/link";
import { useRouter } from "next/router";

type TodoPageType = {
  todo: TodoType;
};

function EditPage({ todo }: TodoPageType) {
  const router = useRouter();
  const [checked, setChecked] = useState(todo.isCompleted);
  const [todoData, setTodoData] = useState({
    title: todo.title,
    category: todo.category,
  });

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
    const { data } = await axios.put(`/api/todos/edit/${todo._id}`, {
      ...todoData,
      isCompleted: checked,
    });
    console.log(data);
    router.push("/");
  };

  return (
    <form
      onSubmit={formHandler}
      className=" flex flex-col w-1/2  mx-auto space-y-3 px-4 "
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
      <div>
        <input
          type="checkbox"
          name="checked"
          id="checked"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="checked">is completed ?</label>
      </div>
      <div className="flex space-x-3">
        <button className="bg-primary-500 text-white px-4 py-3 rounded-md w-full">
          <Link href="/">Back</Link>
        </button>
        <button
          type="submit"
          className="bg-primary-500 text-white px-4 py-3 rounded-md w-full"
        >
          Edit Todo
        </button>
      </div>
    </form>
  );
}

export default EditPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const todoId = ctx.params?.todoId;

  const todo = await getOneTodoFrmDB(todoId);

  return { props: { todo: JSON.parse(JSON.stringify(todo)) } };
};
