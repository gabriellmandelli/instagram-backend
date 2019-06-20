const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fileSystem = require('fs')

module.exports = {

  // get all posts
  async index(req, res) {
    const posts = await Post.find().sort('-createAt');

    return res.json(posts);
  },

  // save post
  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // resize image
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ qualit: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      )

    // remove original file
    fileSystem.unlinkSync(req.file.path);

    // create in db
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    // send information in realltime to FrontEnd
    req.io.emit('post', post)

    return res.json(post);
  },

  // Remove all
  async removeAll(req, res) {
    const posts = await Post.deleteMany();
    return res.json(posts)
  },

  // Remove by id
  async removeById(req, res) {
    console.log('Removendo Post.id: ' + req.params.id);

    const posts = await Post.findByIdAndDelete(req.params.id);

    return res.json(posts)
  },
}