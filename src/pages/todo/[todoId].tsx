import axios from "axios";
import React from "react";
import { GetServerSideProps } from "next";
import { TodoType } from "../../../types/types";
import { getOneTodoFrmDB } from "../api/todos/[todoId]";
import Todo from "../../components/Todo";

type TodoPageType = {
  todo: TodoType;
};

function TodoPage({ todo }: TodoPageType) {
  return (
    <div>
      <p>TodoPage {todo.title}</p>
      <Todo todo={todo} />
    </div>
  );
}

export default TodoPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const todoId = ctx.params?.todoId;

  const todo = await getOneTodoFrmDB(todoId);

  return { props: { todo: JSON.parse(JSON.stringify(todo)) } };
};
