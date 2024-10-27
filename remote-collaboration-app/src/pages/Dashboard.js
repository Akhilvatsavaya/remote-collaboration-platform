import React from 'react';
import {auth} from '../firebase';

const Dashboard = () => {
    const user = auth.currentUser;

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome, {user?.email}!</h2>
            <p>This is your main dashboard where you’ll manage tasks and chat with team members.</p>

            {/* Placeholder for Task Management */}
            <section style={{marginTop: '30px' }}>
                <h3>Task Management</h3>
                <p>Coming soon: A feature to view, create, and manage your tasks.</p>
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