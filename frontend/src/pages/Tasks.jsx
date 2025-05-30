import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Task from '../components/Task';
import '../styles/Tasks.css';

function Tasks() {
     const [tasks, setTasks] = useState([]);
     const [editingTask, setEditingTask] = useState(null);
     const [editedTitle, setEditedTitle] = useState("");
     const [editedDescription, setEditedDescription] = useState("");

     useEffect(() => {
          getTasks();
     }, []);

     const getTasks = () => {
          api
               .get('/api/tasks/')
               .then((response) => response.data)
               .then((data) => { setTasks(data); console.log(data) })
               .catch((err) => alert(err));
     }

     const deleteTask = (id) => {
          api
               .delete(`/api/tasks/delete/${id}/`)
               .then((res) => {
                    if (res.status === 204) alert("Task deleted successfully");
                    else alert("Failed to delete task");
                    getTasks();
               })
               .catch((err) => alert(err));
     };

     const startEditing = (task) => {
          setEditingTask(task);
          setEditedTitle(task.title);
          setEditedDescription(task.description);
     };

     const cancelEditing = () => {
          setEditingTask(null);
          setEditedTitle("");
          setEditedDescription("");
     };

     const handleEditSubmit = (id) => {
          api
               .put(`/api/tasks/${id}/update/`, {
                    title: editedTitle,
                    description: editedDescription
               })
               .then((res) => {
                    if (res.status === 200) {
                         alert("Task updated successfully");
                         setEditingTask(null);
                    }
                    else alert("Failed to update task");
                    getTasks();
               })
               .catch((err) => alert(err));
     };

     const toggleComplete = (id) => {
          const task = tasks.find(t => t.id === id);
          api
               .put(`/api/tasks/${id}/update/`, {
                    ...task,
                    completed: !task.completed
               })
               .then((res) => {
                    if (res.status === 200) {
                         getTasks();
                    } else {
                         alert("Failed to update task completion");
                    }
               })
               .catch((err) => alert(err));
     };

     return (
          <div>
               <div className="tasks-section">
                    <h2>Tasks</h2>
                    {tasks.length === 0 ? (
                         <div className="no-tasks-message">
                              <p>No tasks available.<Link to="/">Create a new task</Link></p>

                         </div>
                    ) : (
                         [...tasks]
                              .sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)
                              .map((task) => (
                                   <div key={task.id}>
                                        {editingTask?.id === task.id ? (
                                             <div className="edit-form">
                                                  <input
                                                       type="text"
                                                       value={editedTitle}
                                                       onChange={(e) => setEditedTitle(e.target.value)}
                                                  />
                                                  <textarea
                                                       value={editedDescription}
                                                       onChange={(e) => setEditedDescription(e.target.value)}
                                                  />
                                                  <button onClick={() => handleEditSubmit(task.id)}>Save</button>
                                                  <button onClick={cancelEditing}>Cancel</button>
                                             </div>
                                        ) : (
                                             <Task
                                                  task={task}
                                                  onDelete={deleteTask}
                                                  onEdit={() => startEditing(task)}
                                                  onComplete={toggleComplete}
                                             />
                                        )}
                                   </div>
                              ))
                    )}
               </div>
          </div>

     )
}
export default Tasks;