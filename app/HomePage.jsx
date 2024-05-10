"use client";

import { useEffect, useState } from "react";
import CreatedTasks from "./CreatedTasks";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [tasksValue, setTasksValue] = useState(" ");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // get tasks
  const fetchTasks = () => {
    fetch("https://tma-server-630e.onrender.com/tasks")
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
      fetch("https://tma-server-630e.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ task: tasksValue.trim() }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSuccessMessage(data.message);
          setTimeout(() => {
            setSuccessMessage("");
          }, 1500);

          fetchTasks();
          setTasks((prevTasks) => [...prevTasks, data]);
          setTasksValue("");
        })
        .catch((error) => {
          console.error("Error saving task to the database", error);
        });
    } else {
      setErrorMessage("Fill the input field!");

      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }
  };

  // edit tasks
  const handleEdit = (index, editedTask) => {
    const taskId = tasks[index]._id;
    const updatedTask = { content: editedTask };

    fetch(`https://tma-server-630e.onrender.com/tasks/${taskId}`, {
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
        setUpdateMessage(data.message);
        setTimeout(() => {
          setUpdateMessage("");
        }, 1500);

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

    fetch(`https://tma-server-630e.onrender.com/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setDeleteMessage("Task deleted successfully");
          setTimeout(() => {
            setDeleteMessage("");
          }, 1500);

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
      <h1 className="text-center font-semibold text-base md:text-xl pt-5">
        Task Management Application(T.M.A)
      </h1>
      <div className="ml-10 mt-10 space-y-2">
        <input
          type="text"
          value={tasksValue}
          onChange={(e) => setTasksValue(e.target.value)}
          className="border outline-none px-3 border-green-900 h-10 w-[70%] md:w-[30%]"
          placeholder="Input task here"
        />
        <div className="font-semibold text-base md:text-lg">
          <button
            className="bg-green-300 p-1 md:p-2 rounded-md border border-green-400 outline-none text-sm md:text-base"
            onClick={handleCreateTask}
          >
            Create Task
          </button>
        </div>
      </div>
      <p className="italic text-green-600 text-center text-base md:text-lg font-semibold uppercase">
        {successMessage}
      </p>
      <p className="italic text-red-700 text-center text-base md:text-lg font-semibold uppercase">
        {errorMessage}
      </p>
      <p className="italic text-red-600 text-center text-base md:text-lg font-semibold uppercase">
        {deleteMessage}
      </p>
      <p className="italic text-green-600 text-center text-base md:text-lg font-semibold uppercase">
        {updateMessage}
      </p>
      <div className="border border-green-900 mt-10 mx-10"></div>

      <CreatedTasks tasks={tasks} onSave={handleEdit} onDelete={handleDelete} />
    </section>
  );
}
