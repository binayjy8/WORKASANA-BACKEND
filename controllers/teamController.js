const Team = require('../models/Team');

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
}

const createTeams = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newTeam = await Team.create({ name, description });
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
}

const deleteTeams = async (req, res) => {
    try {
        const { id } = req.params;
        await Team.findByIdAndDelete(id);
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
}

const updateTeams = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedTeam = await Team.findByIdAndUpdate(id, { name, description }, { new: true });
        if(!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(updatedTeam); 
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error });
    }
}

module.exports = { getTeams, createTeams, deleteTeams, updateTeams };