const express = require('express');
const uploadConfig = require('./config/upload');

// allow express to understend the file types
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// Return all posts
routes.get('/posts', PostController.index);

// Create post
routes.post('/posts', upload.single('image'), PostController.store);

// Remove all posts
routes.delete('/posts', PostController.removeAll);

// Remove post byId
routes.delete('/posts/:id', PostController.removeById);

// add like in one post byId
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;