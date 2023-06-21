import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/utils/dbConnect";
import Todo from "../../../../server/models/todo";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } else if (req.method === "POST") {
    const requestBody = req.body;
    await Todo.create(requestBody);
    const todos = await Todo.find({});
    res.status(201).json({ todos });
  }
}
