const express = require('express');
const router = express.Router();
const moviesRouter = require('./movies');
const directorsRouter = require('./directors');

router.get('/', (req, res) => {
  res.send('Movie Database API — visit /api-docs for Swagger documentation.');
});

router.use('/movies', moviesRouter);
router.use('/directors', directorsRouter);

module.exports = router;
