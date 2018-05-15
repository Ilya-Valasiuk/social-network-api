const mongoose = require('mongoose');
// const logger = require('logger').createLogger();

const UserSchema = mongoose.Schema({
  id: String,
  name: String,
  displayName: String,
  photoLink: String,
  position: {
    lat: Number,
    lng: Number,
  },
  notifications: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: String,
    time: String,
    date: String,
  }],
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interests' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
