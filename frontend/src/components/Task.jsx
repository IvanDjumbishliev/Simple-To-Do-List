import React from "react";
import "../styles/Task.css";

function Task({ task, onDelete, onEdit }) {
     const formattedDate = new Date(task.created_at).toLocaleDateString("bul-BG");

     return (
          <div className="task">
               <h3>{task.title}</h3>
               <p>{task.description}</p>
               <p>Created at: {formattedDate}</p>
               <button onClick={() => onDelete(task.id)}>Delete</button>
               <button onClick={() => onEdit(task)}>Edit</button>
          </div>
     );
}

export default Task;