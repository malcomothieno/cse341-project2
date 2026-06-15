const {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
} = require('../models/directorsModel');

const REQUIRED_FIELDS = ['firstName', 'lastName', 'nationality', 'birthYear', 'knownFor'];

function validate(body, requireAll) {
  const errors = [];

  if (requireAll) {
    for (const field of REQUIRED_FIELDS) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  if (body.birthYear !== undefined) {
    const y = Number(body.birthYear);
    if (isNaN(y) || y < 1850 || y > new Date().getFullYear()) {
      errors.push('birthYear must be a valid year between 1850 and present');
    }
  }

  if (body.firstName !== undefined && typeof body.firstName !== 'string') {
    errors.push('firstName must be a string');
  }

  if (body.lastName !== undefined && typeof body.lastName !== 'string') {
    errors.push('lastName must be a string');
  }

  return errors;
}

// GET /directors
async function getAll(req, res) {
  try {
    const directors = await getAllDirectors();
    res.status(200).json(directors);
  } catch (err) {
    console.error('getAll directors:', err);
    res.status(500).json({ error: 'Failed to retrieve directors' });
  }
}

// GET /directors/:id
async function getOne(req, res) {
  try {
    const director = await getDirectorById(req.params.id);
    if (!director) return res.status(404).json({ error: 'Director not found' });
    res.status(200).json(director);
  } catch (err) {
    console.error('getOne director:', err);
    res.status(400).json({ error: 'Invalid ID or director not found' });
  }
}

// POST /directors
async function create(req, res) {
  try {
    const errors = validate(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    const { firstName, lastName, nationality, birthYear, knownFor } = req.body;
    const result = await createDirector({
      firstName,
      lastName,
      nationality,
      birthYear: Number(birthYear),
      knownFor,
    });
    res.status(201).json({ message: 'Director created successfully', id: result.insertedId });
  } catch (err) {
    console.error('create director:', err);
    res.status(500).json({ error: 'Failed to create director' });
  }
}

// PUT /directors/:id
async function update(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    const errors = validate(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    const result = await updateDirector(req.params.id, req.body);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Director not found' });
    res.status(200).json({ message: 'Director updated successfully' });
  } catch (err) {
    console.error('update director:', err);
    res.status(400).json({ error: 'Failed to update director' });
  }
}

// DELETE /directors/:id
async function remove(req, res) {
  try {
    const result = await deleteDirector(req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Director not found' });
    res.status(200).json({ message: 'Director deleted successfully' });
  } catch (err) {
    console.error('delete director:', err);
    res.status(400).json({ error: 'Failed to delete director' });
  }
}

module.exports = { getAll, getOne, create, update, remove };
