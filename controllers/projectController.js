const Project = require('../models/Project');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newProject = await Project.create({name, description});
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", deletedProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllProjects, createProject, deleteProject, updateProject };