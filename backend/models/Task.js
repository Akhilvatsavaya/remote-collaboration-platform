const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String },
    status: {type: String, default: "To Do"},
    createdAt: { type: Date, default: Date.now},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;