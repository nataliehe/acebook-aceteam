var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  created: {
    type: String,
    default: "Hello, world!"
  }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;


