const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: String,
  name: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
