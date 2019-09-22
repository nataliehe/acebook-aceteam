var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  comment: String,
  created: {
       type: Date,
       default: Date.now
   }
  post_id: {
    type:mongoose.Schema.Type.ObjectID
    ref: "Post"
  }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
