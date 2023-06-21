import axios from "axios";
import Todo from "../components/Todo";
import { useState } from "react";
import FormTodo from "../components/FormTodo";
import { TodoType } from "../../types/types";

type TodosPropsType = {
  todos: TodoType[];
};

export default function Home({ todos }: TodosPropsType) {
  const [todosList, setTodosList] = useState(todos);

  const todoList = todosList.map((todo) => {
    return <Todo key={todo._id} todo={todo} setTodosList={setTodosList} />;
  });

  const addTodo = (data: TodoType[]) => {
    console.log(data);
    setTodosList(data);
  };

  return (
    <div className="grid grid-cols-12 gap-5 my-8">
      <div className="col-span-6">
        {todoList.length === 0 ? (
          <p className="flex justify-center font-semibold text-3xl text-gray-600">
            Please Add Todo ...
          </p>
        ) : (
          todoList
        )}
      </div>
      <div className="col-span-6">
        <FormTodo setAllTodos={addTodo} />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get<TodosPropsType>(
    "http://localhost:3000/api/todos"
  );

  return {
    props: { todos: data.todos },
  };
};
