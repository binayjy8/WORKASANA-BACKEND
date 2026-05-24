const express = require('express');
const router = express.Router();
const { getAllProjects, createProject, deleteProject, updateProject } = require('../controllers/projectController');

router.get("/", getAllProjects);

router.post("/", createProject);

router.delete("/:id", deleteProject);

router.put("/:id", updateProject);

module.exports = router;