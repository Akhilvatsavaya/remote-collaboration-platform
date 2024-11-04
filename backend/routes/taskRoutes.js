const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

module.exports = (io) => {
    //create new task
    router.post('/tasks', async(req, res) => {
        try{
            const newTask = new Task(req.body);
            const savedTask = await newTask.save();
            io.emit('taskAdded', savedTask);// Emit task added event
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

    // Update an existing task by Id
    router.put('/tasks/:id', async (req, res) => {
        try{
            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new : true } //Returns the updated document
            );
            io.emit('taskUpdated', updatedTask); //Emit task updated event
            res.json(updatedTask);
        }catch(error) {
            res.status(500).json({message: "Error updating task", error});
        }
    });

    //Delete a task by ID
    router.delete('/tasks/:id', async(req, res) => {
        try{
            const deletedTask = await Task.findByIdAndDelete(req.params.id);
            if(!deletedTask) {
                return res.status(404).json({message: "Task not found"});
            }
            io.emit('taskDeleted', req.params.id); // Emit task deleted event
            res.json({ message : "Task deleted successfully", deletedTask});
        } catch(error) {
            res.status(500).json({message: "Error deleting task : ", error});
        }
    });

    return router;
};