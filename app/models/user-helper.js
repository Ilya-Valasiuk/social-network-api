const UserModel = require('./User');

const createUser = userData => new Promise((resolve, reject) => {
  const User = new UserModel(userData);

  User.save((err, user) => {
    if (err) {
      console.log('User was not saved', err);

      reject(err);
    }

    resolve({ err, user });
  });
});

const findOrCreate = (userData, cb = () => {}) => {
  UserModel.find({ id: userData.id }, (err, user) => {
    if (err) {
      console.log('User was not found', err);
    }

    if (user.length) {
      cb(err, user);
    } else {
      createUser(userData)
        .then(({ err, user }) => {
          cb(err, user);
        })
        .catch(cb);
    }
  });
};

module.exports = {
  createUser,
  findOrCreate,
};
