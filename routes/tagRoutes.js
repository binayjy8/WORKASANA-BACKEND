const express = require('express');
const router = express.Router();
const { getTags, createTag } = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getTags);
router.post('/', authMiddleware, createTag);

module.exports = router;