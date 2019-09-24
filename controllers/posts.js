var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find({}).sort({created: -1}).exec(function(err, posts) {
      if (err) { throw err; }
      var posts_formatted = posts.map( post => {
        var post_f = {};
        post_f["message"] = post.message;
        post_f["created"] = post.created.toString().slice(0,21);
        post_f["user"] = post.user;
        post_f["id"] = post._id;
        post_f["comments"] = post.comments;
        return post_f;
      });
      console.log(req.cookies.user);
      res.render('posts/index', { logged_in: true, user: req.cookies.user, posts: posts_formatted });
    });
  },

  Create: function(req, res) {
    var post = new Post({ message: req.body.message, user: req.body.user });
    post.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
