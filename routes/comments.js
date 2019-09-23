var express = require('express');
var router = express.Router();

var CommentsController = require('../controllers/comments');

router.get('/new', CommentsController.New);
router.post('/', CommentsController.Create);

module.exports = router;
