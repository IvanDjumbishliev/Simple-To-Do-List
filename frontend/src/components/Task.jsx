import React from "react";
import "../styles/Task.css";

function Task({ task, onDelete, onEdit, onComplete }) {
     const formattedDate = new Date(task.created_at).toLocaleDateString("bul-BG");

     return (
          <div className={`task ${task.completed ? "completed" : ""}`}>
               <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Created at: {formattedDate}</p>
               </div>
               <div className="task-buttons">
                    <button onClick={() => onComplete(task.id)}>
                         {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => onEdit(task)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
               </div>
          </div>
     );
}

export default Task;