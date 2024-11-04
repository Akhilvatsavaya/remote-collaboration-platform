import React, {useEffect, useState} from 'react';
import {auth} from '../firebase';
import {fetchTasks, addTask, updateTask, deleteTask} from '../services/api';
import './Dashboard.css';

import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

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
            setTasks(tasksFromServer);
        };
        getTasks();

        // Listen for real-time task updates
        socket.on('taskAdded', (newTask) => {
          setTasks((prevTasks) => [...prevTasks, newTask]);
        });

        socket.on('taskUpdated', (updatedTask) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
          );
        });

        socket.on('taskDeleted', (taskId) => {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        });

        // Clean up on component unmount
        return () => {
          socket.off('taskAdded');
          socket.off('taskUpdated');
          socket.off('taskDeleted');
        };
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

    // Handle task deletion
    const handleDeleteTask = async(id) => {
        const response = await deleteTask(id);
        if( response && response.message === "Task deleted successfully") {
            setTasks(tasks.filter(task => task._id !== id));
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
                                <button onClick = {() => handleDeleteTask(task._id)} style={{marginLeft: '10px', backgroundColor: '#dc3545'}}>
                                    Delete
                                </button>
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