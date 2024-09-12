import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Todos from "@/Components/Todos";

export default function Home() {
  const [datas, setData] = useState([]);
  const [todo, setTodo] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const newTodo = {
    completed: false
  };

  const onSubmit = (data) => {
    const todos = { ...data, ...newTodo };
    setTodo(todos);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/todos");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const postData = async () => {
      if (todo !== null) {
        try {
          await axios.post("http://localhost:8080/todos", todo);
          const response = await axios.get("http://localhost:8080/todos");
          setData(response.data);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      }
    };

    postData();
  }, [todo]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      const response = await axios.get("http://localhost:8080/todos");
      setData(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todos");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mt-[50px]">
      <div className="border-black rounded-[20px] py-[30px] w-[400px] mx-auto inset">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[200px] mx-auto">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Названия:"
              className="text-[#ffffff] bg-black inset-shadow px-[7px] py-[3px]"
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Задание:"
              className="text-[#ffffff] bg-black inset-shadow px-[7px] py-[3px]"
            />
          </div>

          <div className="flex justify-center mt-[20px]">
            <button
              type="submit"
              className="bg-[#ffffff] text-[#000] text-[14px] px-[20px] py-[7px] rounded-[4px] cursor-pointer"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-4 gap-y-[50px] mt-[80px] h-[300px] overflow-scroll">
        {datas.length > 0 &&
          datas.map((data) => (
            <Todos
              key={data.id}
              data={data}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))
        }
      </div>
    </div>
  );
}
