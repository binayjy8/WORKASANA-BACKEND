const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
       const { project, team, search, status, page = 1, limit = 5, sortBy = "createdAt", order = "desc" } = req.query;
       let filter = {};

       if (project) {
              filter.project = project;
       }

       if (team) {
              filter.team = team;
       }

       if (search) {
              filter.$or = [
                     { name: { $regex: search, $options: 'i' } }
              ];
       }

       if (status) {
              filter.status = status;
       }

       const sortOptions = {};
       sortOptions[sortBy] = order === "asc" ? 1 : -1;

       const skip = (page - 1) * limit;

       const tasks = await Task.find(filter)
              .populate('project')
              .populate('team')
              .sort(sortOptions)
              .skip(skip)
              .limit(Number(limit));

       const totalTasks = await Task.countDocuments(filter);       

       res.status(200).json({ totalTasks, currentPage: Number(page), totalPages: Math.ceil(totalTasks / limit), tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
}

const createTask = async (req, res) => {
    try {
        const { name, project, team, owners, tags, timeToComplete, status, } = req.body;
        const newTask = await Task.create({ name, project, team, owners, tags, timeToComplete, status });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
}

module.exports = { getTasks, createTask };