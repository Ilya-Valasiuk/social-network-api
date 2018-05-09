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

const updateUserWithPosition = ({ userId, position }) => new Promise((resolve, reject) => {
  UserModel.findOne({ id: userId }, (err, user) => {
    if (err) {
      console.log('User was not found', err);
      reject(err);
    } else if (!user) {
      reject(new Error('User not exist'));
    } else {
      user.position = position;

      user.save((err, updatedUser) => {
        if (err) {
          reject(err);
        }
        resolve({ user: updatedUser });
      });
    }
  });
});

const updateUserWithNotification = ({ userId, notification }) => new Promise((resolve, reject) => {
  UserModel.findOne({ id: userId }, (err, user) => {
    if (err) {
      console.log('User was not found', err);
      reject(err);
    } else if (!user) {
      reject(new Error('User not exist'));
    } else {
      user.notifications.push({ user: notification.fromObjectUserId, place: notification.place, time: notification.time });

      user.save((err, updatedUser) => {
        if (err) {
          reject(err);
        }
        updatedUser.populate('interests', (err, user) => {
          if (err) {
            reject(err);
          }

          user.populate('notifications.user', (err, user) => {
            if (err) {
              reject(err);
            }
            resolve({ user });
          });
        });
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

const getBestMatchedUsers = user => new Promise((resolve, reject) => {
  const { _id } = user;

  UserModel
    .find({
      _id: { $ne: _id },
    })
    .populate('interests')
    .exec((err, users) => {
      const bestMatchedUsers = users.filter(posibleUser => posibleUser.interests.some(interest => user.interests.some(userInterest => String(userInterest._id) == String(interest._id))));

      if (err) {
        reject(err);
      }
      resolve({ users: bestMatchedUsers });
    });
});

module.exports = {
  findUser,
  createUser,
  findOrCreate,
  updateUserWithInterets,
  updateUserWithPosition,
  updateUserWithNotification,
  getBestMatchedUsers,
  getUsers,
};
