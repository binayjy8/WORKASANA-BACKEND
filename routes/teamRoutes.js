const express = require('express');
const router = express.Router();

const {
    getTeam,
    createTeam,
    deleteTeam,
    updateTeam
} = require('../controllers/teamController');


router.get('/', getTeam);
router.post('/', createTeam);
router.delete('/:id', deleteTeam);
router.put('/:id', updateTeam);


module.exports = router;