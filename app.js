var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')


// var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

var app = express();

// View engine setup
var viewsPath = path.join(__dirname, '/views');
app.set('views', viewsPath);
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: viewsPath,
  partialsDir: viewsPath + '/partials'
  // helpers: viewsPath + '/helpers'
}));

// Set static filepaths
// app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/static', express.static('public'));

//bodyParser config
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//misc app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route setup
app.param('id', function(req, res, next, id) {
  req.post_id = id
  next()
});

app.use('/', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Routing error')
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
