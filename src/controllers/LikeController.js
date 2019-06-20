const Post = require('../models/Post');

module.exports = {
  // add likes
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    // emite information to frontEnd
    req.io.emit('like', post);

    return res.json(post);
  },
}