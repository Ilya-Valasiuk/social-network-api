const mongoose = require('mongoose');

const DATABASE = {
  local: 'mongodb://localhost:27017/social-network',
  remote: '',
};

const connectToDatabase = () => {
  const dbUrl = process.env.NODE_ENV === 'production' ? DATABASE.production : DATABASE.local;
  mongoose.connect(dbUrl);

  const db = mongoose.connection;

  db.on('error', () => console.error(`connection error to ${dbUrl}`));
  db.once('open', () => {
    console.log(`Connected to ${dbUrl}`);
  });
};

module.exports = {
  connectToDatabase,
};
