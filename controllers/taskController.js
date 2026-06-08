const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const {
            project, team, search, status,
            page = 1, limit = 50,              
            sortBy = "createdAt", order = "desc"
        } = req.query;

        let filter = {};

        if (project) filter.project = project;
        if (team)    filter.team    = team;
        if (status)  filter.status  = status;

        if (search) {
            filter.$or = [
                { name:     { $regex: search, $options: 'i' } },
                { assignee: { $regex: search, $options: 'i' } }, 
                { tags:     { $regex: search, $options: 'i' } }, 
            ];
        }

        const sortOptions = {};
        sortOptions[sortBy] = order === "asc" ? 1 : -1;

        const skip = (page - 1) * limit;

        const tasks = await Task.find(filter)
            .populate('project')
            .populate('team')
            .populate('owners')          
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const totalTasks = await Task.countDocuments(filter);

        res.status(200).json({
            totalTasks,
            currentPage:  Number(page),
            totalPages:   Math.ceil(totalTasks / limit),
            tasks,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

const createTask = async (req, res) => {
    try {
        const {
            name, project, team, owners, tags,
            timeToComplete, status, dueDate, priority, assignee
        } = req.body;

        const newTask = await Task.create({
            name, project, team, owners, tags,
            timeToComplete, status, dueDate, priority, assignee
        });

        
        const populated = await Task.findById(newTask._id)
            .populate('project')
            .populate('team')
            .populate('owners');

        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, project, team, owners, tags,
            timeToComplete, status, dueDate, priority, assignee
        } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { name, project, team, owners, tags, timeToComplete, status, dueDate, priority, assignee },
            { new: true, runValidators: true }
        )
        
        .populate('project')
        .populate('team')
        .populate('owners');

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
