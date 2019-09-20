var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');
// var UsersController = require('../../controllers/users');

describe('User model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
      done();
    });
  });

  var user = new User({
    name: 'John',
    email: 'test@example.com',
    password: 'password123'
  });

  describe('.Create', function() {
    it('creates a new user', function(done) {
      user.save(function(err) {
        expect(err).toBeNull();

        User.find(function(err, users) {
          expect(err).toBeNull();
          expect(users[0].name).toEqual(user.name);
          expect(users[0].email).toEqual(user.email);
          expect(users[0].password).toEqual(user.password);
          done();
        });
      });
    });
  });

  // describe('.Authenticate', function() {
  //   it('logs in if user entered correct email and password', function() {
  //     var logged_in = UsersController.Authenticate();
  //     expect(logged_in).toEqual(true);
  //   });
  // });
});
