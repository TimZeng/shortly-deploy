var db = require('../newConfig');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = db.Schema({
  username: { type: String, index: { unique: true }},
  password: String,
  date: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  var user = this;
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      user.password = hash;
      next();
    });
});

var User = db.model('User', userSchema);

module.exports = User;