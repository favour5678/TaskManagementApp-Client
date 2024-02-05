import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";

export default function CreatedTasks({ tasks }) {
  return (
    <div>
      {tasks.map((task, index) => {
        <div key={index}>
          <p>{task}</p>
          <FaRegEdit />
          <BsTrash3Fill />
        </div>
      })}
    </div>
  );
}
