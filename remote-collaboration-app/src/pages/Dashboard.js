import React, {useEffect, useState} from 'react';
import {auth} from '../firebase';
import {fetchTasks, addTask} from '../services/api';

const Dashboard = () => {
    const user = auth.currentUser;
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //Fetch tasks when component loads
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            console.log("Fetched Tasks:", tasksFromServer); // Log once for debug
            setTasks(Array.isArray(tasksFromServer) ? tasksFromServer : []);
        };
        getTasks();
    }, []); // Empty array to ensure it runs only once


    //Handle form submission to add a Task
    const handleAddTask = async(e) => {
        e.preventDefault();
        const newTask = {title, description};
        const addedTask = await addTask(newTask);
        if(addedTask){
            setTasks([...tasks, addedTask]);
            setTitle(''); //Clear the title field
            setDescription(''); //Clear the description field
        }
    };

    return (
        <div style={{ padding : '20px' }}>
            <h1>Dashboard</h1>
            <h2>Welcome to your Task Manager</h2>

            {/* Task Form */}
            <section style={{ marginBottom: '30px' }}>
                <h3>Add New Task</h3>
                <form onSubmit = {handleAddTask}>
                    <input
                        type="text"
                        placeholder = "Task Title"
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange= {(e) => setDescription(e.target.value)}
                    ></textarea>
                    <button type="submit">Add Task</button>
                </form>
            </section>

            {/* Task List */}
            <section>
                <h3>Task List</h3>
                <ul>
                    {tasks.map((task, index) => {
                        console.log("Rendering Task:", task); // Confirm individual task object structure
                        return (
                            <li key={task._id || index}> {/* Add a fallback key for index */}
                                <h4>{task.title || "No Title"}</h4>
                                <p>{task.description || "No Description"}</p>
                                <p>Status: {task.status || "Unknown Status"}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>


             {/* Placeholder for Chat */}
             <section style={{ marginTop: '30px' }}>
                <h3>Team Chat</h3>
                <p>Coming soon: A feature to chat with your team members in real-time.</p>
             </section>
        </div>
    );
};

export default Dashboard;