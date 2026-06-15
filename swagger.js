const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie Database API',
    description: 'RESTful API for managing movies and directors with full CRUD, validation, and error handling.',
    version: '1.0.0',
  },
  host: 'cse341-project-827z.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/movies.js', './routes/directors.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
