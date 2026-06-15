const { getDatabase } = require('../db/connect');
const { ObjectId } = require('mongodb');

const COLLECTION = 'movies';

async function getAllMovies() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

async function getMovieById(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function createMovie(data) {
  const db = getDatabase();
  return db.collection(COLLECTION).insertOne(data);
}

async function updateMovie(id, fields) {
  const db = getDatabase();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: fields }
  );
}

async function deleteMovie(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
