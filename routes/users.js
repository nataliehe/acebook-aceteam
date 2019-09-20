var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/users')
router.get('/sign_up', UsersController.New);
router.post('/sign_up', UsersController.Create);
router.get('/', UsersController.Login);
router.post('/', UsersController.Authenticate);
router.post('/log_out', UsersController.Logout);

module.exports = router;
