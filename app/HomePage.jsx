"use client";

import { useEffect, useState } from "react";
import CreatedTasks from "./CreatedTasks";

export default function HomePage({ initialTasks }) {
  // const [tasks, setTasks] = useState(initialTasks || []);
  const [tasks, setTasks] = useState([]);
  const [tasksValue, setTasksValue] = useState(" ");

  // useEffect(() => {
  //   setTasks(initialTasks || [])
  // }, [initialTasks])
  
  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks)
    } else {
      fetchTasksFromServer()
    }
  }, [])

  const fetchTasksFromServer = () => {
    fetch('http://localhost:4000/tasks')
    .then(response => response.json())
    .then(data => setTasks(data))
    .catch(err => console.err('Error fetching tasks from the server', err))
  }

  // const handleCreateTask = () => {
  //   if (tasksValue.trim() !== "") {
  //     setTasks((prevTasks) => [...prevTasks, tasksValue.trim()]);
  //     setTasksValue("");
    
  //     fetch('http://localhost:4000/tasks', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify({ task: tasksValue.trim() })
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Task saved to the database', data)
  //       })
  //       .catch(error => {
  //         console.error('Error saving task to the database', error)
  //       })
  //   }
  // };

  const handleCreateTask = () => {
    if (tasksValue.trim() !== "") {
      // Send task to the server
      fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ task: tasksValue.trim() })
      })
        .then(response => response.json())
        .then(newTask => {
          console.log('Task saved to the database', newTask);
          // Update the state with the newly created task
          setTasks(prevTasks => [...prevTasks, newTask]);
          // Clear input field
          setTasksValue("");
        })
        .catch(error => {
          console.error('Error saving task to the database', error);
        });
    }
  };
  

  const handleEdit = (index, editedTask) => {
    const updatedTasks = [...tasks]
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks)
  }

  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }

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
      <div className="border border-green-900 mt-10 mx-10"></div>

      <CreatedTasks tasks={tasks} onEdit={handleEdit} onDelete={handleDelete}/>
    </section>
  );
}