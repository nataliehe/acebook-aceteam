var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars')

var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');

var app = express();

// View engine setup
var viewsPath = path.join(__dirname, '/views');
app.set('views', viewsPath);
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  partialsDir: viewsPath + '/partials'
  // helpers: viewsPath + '/helpers'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route setup
app.use('/', homeRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
