import React from 'react';
import {useEffect, useState} from 'react';
import {fetchTasks} from '../services/api';

const Home = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async() => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);

    return(
        <div>
            <h1>Welcome to the remote collaboration platform</h1>
            <p>This is the home page of our application.</p>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;