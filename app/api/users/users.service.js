const shared = require('../../shared/shared.index');
const {models, utils} = shared;
const {AppError} = models;
const {guardIsOwner} = utils.authorization;

const User = require('../../models/user');

const userGetById = async (id) => {
  const user = await User.findById(id.toString());
  if (!user) throw new AppError('User not found!', 'NOT_FOUND', 'users.service.userGetById');
  return user;
};

const updateStatus = async (id, user, userId) => {
  const updateUser = await userGetById(id);
  guardIsOwner(userId, user, "users.service.updateStatus");

  updateUser.status = user.status;
  const result = await updateUser.save();
  return result;
};

/**
 * Business logic for Feeds entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const feedsService = {
  updateStatus,
};

module.exports = feedsService;
