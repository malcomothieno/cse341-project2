require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const { connectToDatabase } = require('./db/connect');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const swaggerRouter = require('./routes/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Session — stored in MongoDB so it survives Render restarts
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'cse341-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: process.env.DB_NAME || 'movieDB',
    }),
    cookie: { secure: false },
  })
);

// Passport OAuth
app.use(passport.initialize());
app.use(passport.session());

// Swagger UI at /api-docs
app.use('/api-docs', swaggerRouter);

// Auth routes
app.use('/auth', authRouter);

// All app routes
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
      console.log(`Login with GitHub: http://localhost:${PORT}/auth/github`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
