const fs = require('fs');
const path = require('path');
const shared = require('../../shared/shared.index');

const {models, utils} = shared;
const {AppError} = models;
const {guardIsOwner} = utils.authorization;

const Post = require('../../models/post');
const User = require('../../models/user');

async function readById(id) {
  const post = await Post.findById(id.toString());
  if (!post) throw new AppError(`Post with id: ${id}', 'NOT_FOUND', 'feeds.service.readById`);
  return post;
}

const userGetById = async (id) => {
  const user = await User.findById(id.toString());
  if (!user) throw new AppError('User not found!', 'NOT_FOUND', 'feeds.service.userGetById');
  return user;
};

const getPosts = async (query) => {
  const currentPage = query.page || 1;
  const perPage = 2;
  const totalItems = await Post.find().countDocuments();
  const posts = await Post.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
  return {posts: posts, totalItems: totalItems};
};

const createPost = async (post, file, userId) => {
  if (!file) throw new AppError('No image provided', 'UNPROCESSABLE_ENTITY', 'feeds.service.createPost');
  const user = await userGetById(userId);
  const imageUrl = file.path.replace('\\', '/');
  const createPost = new Post({
    title: post.title,
    content: post.content,
    imageUrl: imageUrl,
    creator: userId.toString(),
  });
  const savedPost = await createPost.save();
  user.posts.push(savedPost);
  await user.save();
  return savedPost;
};

const getImageUrl = (file, imageUrl) => {
  if (file) imageUrl = file.path.toString().replace('\\', '/');
  if (!imageUrl) throw new AppError('No file picked.', 'UNPROCESSABLE_ENTITY', 'feeds.service.getImageUrl');
  return imageUrl;
};

const updatePost = async (id, post, file, userId) => {
  const updatePost = await readById(id);
  guardIsOwner(userId, updatePost, "feeds.service.updatePost");
  const imageUrl = getImageUrl(file, post.imageUrl);
  if (imageUrl !== updatePost.imageUrl) clearImage(updatePost.imageUrl);
  updatePost.title = post.title;
  updatePost.imageUrl = imageUrl;
  updatePost.content = post.content;
  const result = await updatePost.save();
  return result;
};

const deletePost = async (id, userId) => {
  const deletePost = await readById(id);
  guardIsOwner(userId, deletePost, "feeds.service.deletePost");
  const user = await userGetById(userId);
  await user.posts.pull(id);
  await user.save();
  clearImage(deletePost.imageUrl);
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', '..', '..', filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new AppError('An error occurred while deleting the file.', 'INTERNAL_SERVER_ERROR', 'feeds.service.clearImage');
    }
  });
};

/**
 * Business logic for Feeds entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const feedsService = {
  readById,
  createPost,
  updatePost,
  deletePost,
  getPosts,
};

module.exports = feedsService;
