var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {

    Post.find({}).sort({created: -1}).exec(function(err, posts) {
      if (err) { throw err; }
      var posts_formatted = posts.map( post => {
        var post_f = {};
        post_f["message"] = post.message;
        post_f["created"] = post.created.toString().slice(0,21);
        post_f["id"] = post._id;
        post_f["comments"] = post.comments;
        return post_f;
      });
      res.render('posts/index', { posts: posts_formatted });
    });
  },

  Create: function(req, res) {
    var post = new Post({ message: req.body.message });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/');
    });
  }
};

module.exports = PostsController;
