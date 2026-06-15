# Movie Database API — CSE 341 W03 Project

RESTful API for managing a movie database with full CRUD operations, data validation, error handling, and Swagger documentation.

## Tech Stack
- Node.js + Express
- MongoDB Atlas (`movieDB` database)
- swagger-ui-express + swagger-autogen
- dotenv

## Project Structure (MVC)
```
w03-project/
├── server.js                       # Entry point
├── db/
│   └── connect.js                  # MongoDB connection
├── models/
│   ├── moviesModel.js              # Queries → 'movies' collection
│   └── directorsModel.js           # Queries → 'directors' collection
├── controllers/
│   ├── moviesController.js         # CRUD logic + validation (8 fields)
│   └── directorsController.js      # CRUD logic + validation
├── routes/
│   ├── index.js                    # Root router
│   ├── movies.js                   # /movies — full CRUD
│   ├── directors.js                # /directors — full CRUD
│   └── swagger.js                  # /api-docs
├── data/
│   └── seed.js                     # Seeds 6 movies + 4 directors
├── swagger.json                    # Swagger 2.0 docs
├── swagger.js                      # swagger-autogen script
├── project.rest                    # REST client test file
├── .env.example                    # Env var template
└── .gitignore                      # Excludes .env + node_modules
```

## Collections

### movies (8 fields — satisfies 7+ field requirement)
| Field | Type | Validation |
|-------|------|------------|
| title | string | required |
| genre | string | required |
| releaseYear | integer | required, 1888–present+5 |
| rating | number | required, 0–10 |
| durationMinutes | integer | required, > 0 |
| language | string | required |
| synopsis | string | required |
| directorName | string | required |

### directors (5 fields)
| Field | Type | Validation |
|-------|------|------------|
| firstName | string | required |
| lastName | string | required |
| nationality | string | required |
| birthYear | integer | required, 1850–present |
| knownFor | string | required |

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /movies | Get all movies |
| GET | /movies/:id | Get movie by ID |
| POST | /movies | Create movie (all 8 fields required) |
| PUT | /movies/:id | Update movie |
| DELETE | /movies/:id | Delete movie |
| GET | /directors | Get all directors |
| GET | /directors/:id | Get director by ID |
| POST | /directors | Create director |
| PUT | /directors/:id | Update director |
| DELETE | /directors/:id | Delete director |

## Setup
1. `npm install`
2. Copy `.env.example` → `.env`, fill in MongoDB URI
3. `node data/seed.js` to populate both collections
4. `npm start`
5. Visit `http://localhost:3000/api-docs`

## Render Environment Variables
- `MONGODB_URI`
- `DB_NAME=movieDB`
