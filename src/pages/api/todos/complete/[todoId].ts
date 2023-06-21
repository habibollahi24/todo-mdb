import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../server/utils/dbConnect";
import Todo from "../../../../../server/models/todo";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const todoId = req.query.todoId;
    const todo = await getOneTodoFrmDB(todoId);
    console.log(todo);
    todo.isCompleted = !todo.isCompleted;

    await todo.save();
    const todos = await Todo.find({});
    res.status(200).json({ msg: "Edit completed Success", todos });
  }
}

export async function getOneTodoFrmDB(params: string | undefined | string[]) {
  const todo = await Todo.findById(params);
  return todo;
}
