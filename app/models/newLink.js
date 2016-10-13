var db = require('../newConfig');
var crypto = require('crypto');

var linkSchema = db.Schema({  
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  date: { type: Date, default: Date.now }
});

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1').update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = db.model('Link', linkSchema);


module.exports = Link;