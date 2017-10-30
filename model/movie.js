const db = require('../db');
const mongoose = db.mongoose;

const movieSchema = new mongoose.Schema({
    name: String,
    releaseDate: Date,
    country: String,
    language: String,
    director: String
}, { collection: 'moviecollection' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;