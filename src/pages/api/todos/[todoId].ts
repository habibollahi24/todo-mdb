import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/utils/dbConnect";
import Todo from "../../../../server/models/todo";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const todoId = req.query.todoId;

    await Todo.findByIdAndDelete(todoId);
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } else if (req.method === "GET") {
    const todoId = req.query.todoId;
    const todo = getOneTodoFrmDB(todoId);
    res.status(200).json({ todo });
  }
}

export async function getOneTodoFrmDB(params: string | undefined | string[]) {
  const todo = await Todo.findById(params);
  return todo;
}
