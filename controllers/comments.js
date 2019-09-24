var Post = require('../models/post.js');

var CommentsController = {
  New: function(req, res) {
    var post_id = req.post_id;
    res.render('comments/new_comment', {post_id: post_id });
  },
  Create: function(req, res){
    var post_id = req.post_id;
    var comment = req.body.message;
    Post.findByIdAndUpdate(post_id, {$push: {comments: { message: comment}}}, function(err, post) {
      if (err) throw err;
    });
    res.redirect('/posts');
  }
}

module.exports = CommentsController;
