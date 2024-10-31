import React, {useEffect, useState} from 'react';
import {auth} from '../firebase';
import {fetchTasks, addTask, updateTask} from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const user = auth.currentUser;
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    //Fetch tasks when component loads
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
//            console.log("Fetched Tasks:", tasksFromServer); // Log once for debug
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);


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

    // Start editing the task
    const startEditing = (task) => {
        setIsEditing(true);
        setEditTaskId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    // Handle the update submission
    const handleUpdateTask = async(e) => {
        e.preventDefault();
        const updatedTask = {title: editTitle, description: editDescription};
        const result = await updateTask(editTaskId, updatedTask);
        if(result){
            setTasks(tasks.map(task => task._id === editTaskId ? result : task));
            setIsEditing(false);
            setEditTaskId(null);
            setEditTitle('');
            setEditDescription('');
        }
    };

    return (
        <div className="dashboard-container">
            <div className = "dashboard-header">
                <h1>Dashboard</h1>
                <h2>Welcome to your Task Manager</h2>
            </div>

            {/* Task Form */}
            <section className = "task-form">
                <h3>{isEditing ? "Edit Task" : "Add New Task"}</h3>
                <form onSubmit = {isEditing ? handleUpdateTask : handleAddTask}>
                    <input
                        type="text"
                        placeholder = "Task Title"
                        value = {isEditing ? editTitle : title}
                        onChange = {(e) => isEditing ? setEditTitle(e.target.value) : setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Task Description"
                        value={isEditing ? editDescription : description}
                        onChange= {(e) => isEditing ? setEditDescription(e.target.value) : setDescription(e.target.value)}
                    ></textarea>
                    <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
                </form>
            </section>

            {/* Task List */}
            <section className = "task-list">
                <h3>Task List</h3>
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task._id}>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <button onClick={() => startEditing(task)}>Edit</button>
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