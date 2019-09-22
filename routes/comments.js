var express = require('express');
var router = express.Router();

var CommentsController = require('../controllers/comments');

router.get ('/index', CommentsController.Index);
router.post('/add', CommentsController.Create);

module.exports = router;
