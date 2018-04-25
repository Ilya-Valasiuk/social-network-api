const mongoose = require('mongoose');
// const logger = require('logger').createLogger();

const UserSchema = mongoose.Schema({
  id: String,
  name: String,
  photoLink: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
