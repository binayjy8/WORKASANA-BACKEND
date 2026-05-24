const express = require('express');
const router = express.Router();
const { getTeams, createTeams, deleteTeams, updateTeams } = require('../controllers/teamController');

router.get('/', getTeams);
router.post('/', createTeams);
router.delete('/:id', deleteTeams);
router.put('/:id', updateTeams);

module.exports = router;