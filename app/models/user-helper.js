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

const findUser = userData => new Promise((resolve, reject) => {
  UserModel
    .findOne({ id: userData.id })
    .populate('interests')
    .exec((err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        resolve();
      }
      resolve(user);
    });
});

const findOrCreate = (userData, cb = () => {}) => {
  findUser(userData)
    .then((user) => {
      // Need to create user
      if (!user) {
        createUser(userData)
          .then(({ err, user }) => {
            cb(err, user);
          })
          .catch(cb);
      } else {
        cb(null, user);
      }
    })
    .catch(err => cb(err, null));
};

const updateUserWithInterets = ({ userId, interests }) => new Promise((resolve, reject) => {
  UserModel.findOne({ id: userId }, (err, user) => {
    if (err) {
      console.log('User was not found', err);
      reject(err);
    } else if (!user) {
      reject(new Error('User not exist'));
    } else {
      user.interests = interests;

      user.save((err, updatedUser) => {
        if (err) {
          reject(err);
        }
        resolve({ user: updatedUser });
      });
    }
  });
});

const getUsers = () => new Promise((resolve, reject) => {
  UserModel
    .find()
    .populate('interests')
    .exec((err, users) => {
      if (err) {
        reject(err);
      }
      resolve({ users });
    });
});

module.exports = {
  findUser,
  createUser,
  findOrCreate,
  updateUserWithInterets,
  getUsers,
};
