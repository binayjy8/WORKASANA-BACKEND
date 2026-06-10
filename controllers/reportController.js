const Task = require("../models/Task");


const getLastWeekReport = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const completedTasks = await Task.find({
            status: "Completed",
            updatedAt: { $gte: lastWeek }
        })
        .populate("project")
        .populate("team")
        .populate("owners");

        res.status(200).json({
            totalCompleted: completedTasks.length,
            tasks: completedTasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching last week report",
            error: error.message
        });
    }
};


const getPendingWorkReport = async (req, res) => {
    try {
        const pendingTasks = await Task.find({
            status: { $ne: "Completed" }
        });

        const totalPendingDays = pendingTasks.reduce(
            (total, task) => total + task.timeToComplete,
            0
        );

        res.status(200).json({
            totalPendingTasks: pendingTasks.length,
            totalPendingDays
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching pending work report",
            error: error.message
        });
    }
};


const getClosedTasksByTeam = async (req, res) => {
    try {
        const report = await Task.aggregate([
            {
                $match: {
                    status: "Completed"
                }
            },
            {
                $group: {
                    _id: "$team",
                    totalClosedTasks: { $sum: 1 }
                }
            }
        ]);

        await Task.populate(report, {
            path: "_id",
            model: "Team"
        });

        res.status(200).json(report);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching team report",
            error: error.message
        });
    }
};


const getClosedTasksByProject = async (req, res) => {
    try {
        const report = await Task.aggregate([
            {
                $match: {
                    status: "Completed"
                }
            },
            {
                $group: {
                    _id: "$project",
                    totalClosedTasks: { $sum: 1 }
                }
            }
        ]);

        await Task.populate(report, {
            path: "_id",
            model: "Project"
        });

        res.status(200).json(report);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching project report",
            error: error.message
        });
    }
};


const getClosedTasksByOwner = async (req, res) => {
    try {
        const report = await Task.aggregate([
            {
                $match: {
                    status: "Completed"
                }
            },
            {
                $unwind: "$owners"
            },
            {
                $group: {
                    _id: "$owners",
                    totalClosedTasks: { $sum: 1 }
                }
            }
        ]);

        await Task.populate(report, {
            path: "_id",
            model: "User"
        });

        res.status(200).json(report);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching owner report",
            error: error.message
        });
    }
};


module.exports = {
    getLastWeekReport,
    getPendingWorkReport,
    getClosedTasksByTeam,
    getClosedTasksByProject,
    getClosedTasksByOwner
};