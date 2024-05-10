import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

export default function CreatedTasks({ tasks, onDelete, onSave }) {
  const [editableTaskIndex, setEditableTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleEdit = (index) => {
    setEditableTaskIndex(index);
    setEditedTask(tasks[index].content);
  };

  const handleSave = (index) => {
    onSave(index, editedTask.trim());

    setEditableTaskIndex(null);
    setEditedTask("");
  };

  const handleCancelEdit = () => {
    setEditableTaskIndex(null);
    setEditedTask("");
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index} className="bg-green-200 mt-5 font-semibold mx-10 py-2">
          {editableTaskIndex === index ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="w-[80%] pl-2 ml-2 outline-none border border-green-900 text-sm md:text-base"
              />
              <button className="icon-style" onClick={() => handleSave(index)}>
                <IoIosCheckmarkCircle className="text-lg md:text-2xl" />
              </button>
              <button className="icon-style" onClick={handleCancelEdit}>
                <MdOutlineCancel className="text-lg md:text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="w-[80%] break-words pl-2 text-sm md:text-base">{task.content}</p>
              <button className="icon-style" onClick={() => handleEdit(index)}>
                <FaRegEdit />
              </button>
              <button
                className="icon-style"
                onClick={() => handleDelete(index)}
              >
                <BsTrash3Fill />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
