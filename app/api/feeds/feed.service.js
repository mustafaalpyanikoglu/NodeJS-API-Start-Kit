const shared = require('../../shared/shared.index');
const {models, utils} = shared;
const {AppError} = models;
const {guardIsOwner} = utils.authorization;

const Post = require('../../models/post');
const fs = require('fs');
const path = require('path');

async function readById(id) {
  const post = await Post.findById(id.toString());
  if (!post) throw new AppError('Post with id: ${id}', 'NOT_FOUND', 'feed.service.readById');
  return post;
}

const getPosts = async (query) => {
  const currentPage = query.page || 1;
  const perPage = 2;
  const totalItems = await Post.find().countDocuments();
  const posts = await Post.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
  return {posts: posts, totalItems: totalItems};
};

const createPost = async (post, file) => {
  if (!file) throw new AppError('No image provided', 'UNPROCESSABLE_ENTITY', 'feed.service.createPost');
  const imageUrl = file.path.replace('\\', '/');

  const createPost = new Post({
    title: post.title,
    content: post.content,
    imageUrl: imageUrl,
    creator: {
      name: 'Alp',
    },
  });

  const result = createPost.save();
  return result;
};

const getImageUrl = (file, imageUrl) => {
  if (file) imageUrl = file.path.toString().replace('\\', '/');
  if (!imageUrl) throw new AppError('No file picked.', 'UNPROCESSABLE_ENTITY', 'feed.service.getImageUrl');
  return imageUrl;
};

const performUpdate = async (id, post, imageUrl) => {
  const updatePost = await readById(id);
  if (imageUrl !== updatePost.imageUrl) clearImage(updatePost.imageUrl);
  updatePost.title = post.title;
  updatePost.imageUrl = imageUrl;
  updatePost.content = post.content;

  const result = await updatePost.save();
  return result;
};

const updatePost = async (id, post, file) => {
  const imageUrl = getImageUrl(file, post.imageUrl);
  const result = await performUpdate(id, post, imageUrl);
  return result;
};

const deletePost = async (id) => {
  const deletePost = await readById(id);
  clearImage(deletePost.imageUrl);
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', '..', '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
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
