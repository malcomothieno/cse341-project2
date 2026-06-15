const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME || 'movieDB');
  console.log('Connected to MongoDB — database:', db.databaseName);
  return db;
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

module.exports = { connectToDatabase, getDatabase };
