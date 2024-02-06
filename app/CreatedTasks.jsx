import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";

export default function CreatedTasks({ tasks, edit, del }) {

  return (
    <div>
      <h2 className="text-center font-semibold my-2 text-lg">Created Tasks</h2>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center bg-green-200 mt-5 font-semibold mx-10 py-2">
          <p className="w-[80%] break-words pl-2">{task}</p>
          <button className="icon-style">
            <FaRegEdit />
          </button>
          <button className="icon-style" onClick={() => del(index)}>
            <BsTrash3Fill />
          </button>
        </div>
      ))}
    </div>
  );
}
