const mongoose = require('mongoose');

const InterestsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Interests = mongoose.model('Interests', InterestsSchema);

module.exports = Interests;
