const express = require('express');
const {body} = require('express-validator');

const feedController = require('../controllers/feed');

const router = express.Router();

// /feed/posts -> GET
router.get('/posts', feedController.getPosts);

// /feed/post -> POST
router.post('/post',
    [
      body('title').trim().isLength({min: 5}),
      body('content').trim().isLength({min: 5}),
    ],
    feedController.createPost,
);

// /feed/post/postId -> GET
router.get('/post/:postId', feedController.getPost);

// /feed/post/postId -> PUT
router.put('/post/:postId',
    [
      body('title').trim().isLength({min: 5}),
      body('content').trim().isLength({min: 5}),
    ],
    feedController.updatePost,
);

// /feed/post/postId -> DELETE
router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
