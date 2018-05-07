const mongoose = require('mongoose');
// const logger = require('logger').createLogger();

const UserSchema = mongoose.Schema({
  id: String,
  name: String,
  photoLink: String,
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interests' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
