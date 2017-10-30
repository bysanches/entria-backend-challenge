const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/entria-backend-challenge', {
    useMongoClient: true
});

module.exports = {
    mongoose
};