var mongoose = require('mongoose');
//Todo: connect the db server
mongoose.connect('mongodb://localhost/shortlyDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;
