var mongoose = require('mongoose');

// USER DETAILS
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  cardNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  money: {type: Number, required: true, default: 0 }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
