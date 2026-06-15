require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./db/connect');
const indexRouter = require('./routes/index');
const swaggerRouter = require('./routes/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger UI at /api-docs
app.use('/api-docs', swaggerRouter);

// All routes
app.use('/', indexRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
