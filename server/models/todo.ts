import { Schema, InferSchemaType, model, models } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

//todo type
export type TodoModelType = InferSchemaType<typeof TodoSchema>;
//todo model
const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
