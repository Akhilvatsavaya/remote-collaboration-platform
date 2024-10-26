const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Basic Route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});
app.get('/api/tasks', (req, res) => {
    res.json({tasks : ['Task 1', 'Task 2', 'Task 3']});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));