const express = require('express');
const uploadConfig = require('./config/upload');

// allow express to understend the file types
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// static variable routes
const ROUTE_POSTS = '/posts';
const PARM_ID = '/:id';
const ROUTE_LIKE = '/like';

// Return all posts
routes.get(ROUTE_POSTS, PostController.index);

// Create post
routes.post(ROUTE_POSTS, upload.single('image'), PostController.store);

// Remove all posts
routes.delete(ROUTE_POSTS, PostController.removeAll);

// Remove post byId
routes.delete(ROUTE_POSTS + PARM_ID, PostController.removeById);

// add like in one post byId
routes.post(ROUTE_POSTS + PARM_ID + ROUTE_LIKE, LikeController.store);

module.exports = routes;