var db = require('../newConfig');

var userSchema = db.Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
});

var User = db.model('User', userSchema);

module.exports = User;