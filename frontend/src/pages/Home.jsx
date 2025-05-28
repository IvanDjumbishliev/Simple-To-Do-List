import { useEffect, useState } from "react"
import api from "../api"
import Task from "../components/Task"
import "../styles/Home.css"

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const createTask = (e) => {
    e.preventDefault();
    api
      .post('/api/tasks/', {
        title,
        description,
      })
      .then((res) => {
        if (res.status === 201) alert("Task created successfully");
        else alert("Failed to create task");
      })
      .catch((err) => alert(err));
  }


  return (
    <div className="home-container">

      <div className="create-task-form">
        <h2>Create a task</h2>
        <form onSubmit={createTask}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <input type="submit" value="Create Task" />
        </form>
      </div>
    </div>
  )
}

export default Home