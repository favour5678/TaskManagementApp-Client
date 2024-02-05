import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";

export default function CreatedTasks({ tasks }) {
  return (
    <div>
      <h2 className="text-center font-semibold my-2 text-lg">Created Tasks</h2>
      {tasks.map((task, index) => (
        <div key={index}>
          <p>{task}</p>
          <FaRegEdit />
          <BsTrash3Fill />
        </div>
      ))}
    </div>
  );
}
