require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');

const directors = [
  { firstName: 'Christopher', lastName: 'Nolan', nationality: 'British-American', birthYear: 1970, knownFor: 'Inception, The Dark Knight, Interstellar' },
  { firstName: 'Ava', lastName: 'DuVernay', nationality: 'American', birthYear: 1972, knownFor: 'Selma, A Wrinkle in Time, 13th' },
  { firstName: 'Bong', lastName: 'Joon-ho', nationality: 'South Korean', birthYear: 1969, knownFor: 'Parasite, Snowpiercer, Memories of Murder' },
  { firstName: 'Denis', lastName: 'Villeneuve', nationality: 'Canadian', birthYear: 1967, knownFor: 'Dune, Blade Runner 2049, Arrival' },
];

// 8 fields each — satisfies 7+ field requirement
const movies = [
  { title: 'Inception', genre: 'Sci-Fi', releaseYear: 2010, rating: 8.8, durationMinutes: 148, language: 'English', synopsis: 'A thief plants an idea inside a target\'s dream using dream-sharing technology.', directorName: 'Christopher Nolan' },
  { title: 'The Dark Knight', genre: 'Action', releaseYear: 2008, rating: 9.0, durationMinutes: 152, language: 'English', synopsis: 'Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.', directorName: 'Christopher Nolan' },
  { title: 'Selma', genre: 'Drama', releaseYear: 2014, rating: 7.5, durationMinutes: 128, language: 'English', synopsis: 'The story of the 1965 Selma to Montgomery voting rights marches led by Martin Luther King Jr.', directorName: 'Ava DuVernay' },
  { title: 'Parasite', genre: 'Thriller', releaseYear: 2019, rating: 8.6, durationMinutes: 132, language: 'Korean', synopsis: 'Greed and class discrimination threaten the bond between a wealthy family and a destitute clan.', directorName: 'Bong Joon-ho' },
  { title: 'Dune', genre: 'Sci-Fi', releaseYear: 2021, rating: 8.0, durationMinutes: 155, language: 'English', synopsis: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset.', directorName: 'Denis Villeneuve' },
  { title: 'Interstellar', genre: 'Sci-Fi', releaseYear: 2014, rating: 8.6, durationMinutes: 169, language: 'English', synopsis: 'Explorers travel through a wormhole in space to ensure humanity\'s survival.', directorName: 'Christopher Nolan' },
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || 'movieDB');

    await db.collection('directors').deleteMany({});
    await db.collection('movies').deleteMany({});

    const dirResult = await db.collection('directors').insertMany(directors);
    console.log(`Inserted ${dirResult.insertedCount} directors`);

    const movResult = await db.collection('movies').insertMany(movies);
    console.log(`Inserted ${movResult.insertedCount} movies`);

    console.log('\n--- Sample IDs for .rest file ---');
    console.log('Director IDs:', Object.values(dirResult.insertedIds).map(id => id.toString()));
    console.log('Movie IDs:', Object.values(movResult.insertedIds).map(id => id.toString()));
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
