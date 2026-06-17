const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/moviesController');
const { isAuthenticated } = require('../middleware/auth');

// Public routes — no login required
router.get('/', getAll);
router.get('/:id', getOne);

// Protected routes — require GitHub OAuth login
router.post('/', isAuthenticated, create);
router.put('/:id', isAuthenticated, update);
router.delete('/:id', isAuthenticated, remove);

module.exports = router;
