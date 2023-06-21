import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../server/utils/dbConnect";
import Todo from "../../../../../server/models/todo";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todoId = req.query.todoId;
    const todo = await getOneTodoFrmDB(todoId);
    res.status(200).json({ todo });
  } else if (req.method === "PUT") {
    const todoId = req.query.todoId;
    const todo = await getOneTodoFrmDB(todoId);
    console.log(todo);
    todo.title = req.body.title;
    todo.category = req.body.category;
    todo.isCompleted = req.body.isCompleted;
    await todo.save();
    res.status(200).json({ msg: "Edit Success" });
  }
}

export async function getOneTodoFrmDB(params: string | undefined | string[]) {
  const todo = await Todo.findById(params);
  return todo;
}
