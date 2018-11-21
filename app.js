/*
 * @Author: miaoqiang
 * @Date: 2018-11-20 10:50:06
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-21 15:32:56
 */

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;
const routes = require('./router/router');
const morgan = require('morgan');
const mongoose = require('mongoose');
const favicon = require('express-favicon');

// mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shunjie', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('mongodb Connection Error:' + err)
  } else {
    console.log('mongodb Connection success!')
  }
});

const app = express();

// allowd cors
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// static
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(favicon(__dirname + '/media/favicon.ico'));


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// routers
app.use(routes);

// 404
app.use(function (req, res, next) {
  var err = new Error('请求地址不存在');
  err.status = 400;
  next(err);
})

// dev
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    })
  })
}

// pro
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  })
})


// start serve
app.listen(port, function () {
  console.log(`Server listen on ${port}...`);
});
