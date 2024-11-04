require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); // Import to create server for Socket.IO
const socketIo = require('socket.io');



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));



const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

//Middleware
app.use(cors());
app.use(express.json());

//Basic Route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// Passing io to taskRoutes and use it as middleware
const taskRoutes = require('./routes/taskRoutes')(io);
//Use task Routes
app.use('/api', taskRoutes);

//Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');

    //Handle Disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



// Export io to be used in routes for real-time notifications
module.exports = io;