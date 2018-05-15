const mongoose = require('mongoose');

const DATABASE = {
  // local: 'mongodb://localhost:27017/social-network',
  local: 'mongodb://admin:admin@ds219040.mlab.com:19040/social-network',
  production: 'mongodb://admin:admin@ds219040.mlab.com:19040/social-network',
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
