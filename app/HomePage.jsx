"use client";

import { useEffect, useState } from "react";
import CreatedTasks from "./CreatedTasks";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [tasksValue, setTasksValue] = useState(" ");
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchTasks();
  }, []);

  // get tasks
  const fetchTasks = () => {
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks from the database", error);
      });
  };

  // create tasks
  const handleCreateTask = () => {
    if (tasksValue.trim() !== "") {
      fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ task: tasksValue.trim() }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.success)
          setSuccessMessage(data.success)

          fetchTasks();
          setTasks((prevTasks) => [...prevTasks, data]);
          setTasksValue("");
        })
        .catch((error) => {
          console.error("Error saving task to the database", error);
        });
    }
  };

  // edit tasks
  const handleEdit = (index, editedTask) => {
    const taskId = tasks[index]._id;
    const updatedTask = { content: editedTask };

    fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ task: { content: updatedTask.content } }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task on the server");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task updated on the server", data);
        const updatedTasks = [...tasks];
        updatedTasks[index].content = updatedTask.content;
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error updating task on the server", error);
      });
  };

  // delete tasks
  const handleDelete = (index) => {
    const taskId = tasks[index]._id;

    fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Task deleted succesfully");

          const updatedTasks = [...tasks];
          updatedTasks.splice(index, 1);
          setTasks(updatedTasks);
        } else {
          throw new Error("Failed to delete task on the server");
        }
      })
      .catch((error) => {
        console.error("Error deleting task on the server", error);
      });
  };

  return (
    <section>
      <h1 className="text-center font-semibold text-xl pt-5">
        Task Management Application(T.M.A)
      </h1>
      <div className="ml-10 mt-10 space-y-2">
        <input
          type="text"
          value={tasksValue}
          onChange={(e) => setTasksValue(e.target.value)}
          className="border outline-none px-3 border-green-900 h-10 w-[30%]"
          placeholder="Input task here"
        />
        <div className="font-semibold text-lg">
          <button
            className="bg-green-300 p-2 rounded-md border border-green-400 outline-none"
            onClick={handleCreateTask}
          >
            Create Task
          </button>
        </div>
      </div>
      <p className="">{}</p>
      <div className="border border-green-900 mt-10 mx-10"></div>
      
      <CreatedTasks tasks={tasks} onSave={handleEdit} onDelete={handleDelete} />
    </section>
  );
}
