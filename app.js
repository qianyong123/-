var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入 cookie-sesstion
var cookieSession=require("cookie-session");

//引入路由中间件
// var indexRouter = require('./routes/index');
//用户路由
var usersRouter = require('./routes/users');
//添加路由
var positionsRouter=require('./routes/positions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用cookie-sesstion中间件
app.use(cookieSession({
    name:"session",
    secret:"ndkoawjrawjrffopjepoqjoe",
    maxAge:300*60*1000
}));
// 使用路由中间件
// app.use('/', indexRouter);
//用户路由
app.use('/api/users', usersRouter);// 请求 api 目录下 users 子目录中的资源
//添加路由
app.use('/api/positions',positionsRouter);// 请求 api 目录下 positions 子目录中的资源

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
