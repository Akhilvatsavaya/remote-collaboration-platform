const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//create new task
router.post('/tasks', async(req, res) => {
    try{
        const {title, description} = req.body;
        const newTask = new Task({title, description});
        await newTask.save();
        res.status(201).json(newTask);
    } catch(error){
        res.status(500).json({message: "Error creating task", error});
    }
});

//Get all tasks
router.get('/tasks', async(req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error) {
        res.status(500).json({message: "Error fetching tasks", error});
    }
});

module.exports = router;