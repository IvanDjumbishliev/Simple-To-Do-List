import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Task from '../components/Task';

function CompletedTasks() {
    const[completedTask, setCompletedTask] = useState([]);
    useEffect(() => {
        getCompletedTasks();
    }, []);
    
    const getCompletedTasks = () => {
        api
            .get('/api/tasks/completed/')
            .then((response) => response.data)
            .then((data) => { setCompletedTask(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const handleComplete = (id) => {
        api
            .put(`/api/tasks/${id}/complete/`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Task marked as completed");
                    getCompletedTasks();
                } else {
                    alert("Failed to mark task as completed");
                }
            })
            .catch((err) => alert(err));
    }

    return (
        <div className="completed-tasks">
            <h2>Completed Tasks</h2>
            {completedTask.length === 0 ? (
                <p>No completed tasks found.</p>
            ) : (
                completedTask.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onComplete={handleComplete}
                    />
                ))
            )}
            <Link to="/tasks" className="btn btn-primary">Back to Tasks</Link>
        </div>
    );

}
export default CompletedTasks;