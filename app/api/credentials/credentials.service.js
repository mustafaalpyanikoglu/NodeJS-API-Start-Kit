const shared = require('../../shared/shared.index');
const {models, utils} = shared;
const {AppError} = models;
const {signUser, guardIsOwner, extractUserId, hashPassword, comparePasswords} = utils.authorization;
const {validationResult} = require('express-validator');

const User = require('../../models/user');

const login = async (credentials) => {
  const user = await userGetByEmail(credentials.email);
  const isEqual = await comparePasswords(credentials.password, user.password);
  if (!isEqual) throw new AppError('Invalid credentials', 'FORBIDDEN', 'credentials.service.login');
  return getUserToken(user);
};

const register = async (user) => {
  await create(user);
  return getUserToken(user);
};

const create = async (user) => {
  await readByEmail(user.email);

  const hashedPassword = await hashPassword(user.password);
  console.log(hashedPassword);
  const createdUser = new User({
    email: user.email,
    password: hashedPassword,
    name: user.name,
  });
  const result = createdUser.save();
  return result;
};

const userGetByEmail = async (email) => {
  const user = await User.findOne({email: email});
  if (!user) throw new AppError('User not found!', 'NOT_FOUND', 'credentials.service.userGetByEmail');
  return user;
};

const readByEmail = async (email) => {
  const user = await User.findOne({email: email});
  if (user) throw new AppError('User already exist', 'CONFLICT', 'credentials.service.readByEmail');
  return user;
};

const getUserToken = (user) => {
  return {
    accessToken: signUser(user.id),
    id: user.id,
  };
};

const credentialsService = {
  register,
  login,
};

module.exports = credentialsService;
