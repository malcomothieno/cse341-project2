const { getDatabase } = require('../db/connect');
const { ObjectId } = require('mongodb');

const COLLECTION = 'directors';

async function getAllDirectors() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

async function getDirectorById(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function createDirector(data) {
  const db = getDatabase();
  return db.collection(COLLECTION).insertOne(data);
}

async function updateDirector(id, fields) {
  const db = getDatabase();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: fields }
  );
}

async function deleteDirector(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllDirectors, getDirectorById, createDirector, updateDirector, deleteDirector };
