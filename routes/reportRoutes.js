const express = require("express");
const router = express.Router();

const {
    getLastWeekReport,
    getPendingWorkReport,
    getClosedTasksByTeam,
    getClosedTasksByProject,
    getClosedTasksByOwner
} = require("../controllers/reportController");


router.get("/last-week", getLastWeekReport);
router.get("/pending", getPendingWorkReport);
router.get("/closed-tasks/team", getClosedTasksByTeam);
router.get("/closed-tasks/project", getClosedTasksByProject);
router.get("/closed-tasks/owner", getClosedTasksByOwner);


module.exports = router;