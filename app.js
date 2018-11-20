/*
 * @Author: miaoqiang 
 * @Date: 2018-11-20 10:50:06 
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-20 17:08:56
 */

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;
const routes = require('./router/router');
const mysql = require('mysql');
const mysqlConf = require('./config/mysqlConfig');


const app = express();

// bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// static
app.use('/media', express.static(path.join(__dirname, 'media')));

// mysql
const connection = mysql.createConnection(
    mysqlConf.mysql
)
connection.connect();

// routers
app.use('/v1', routes);

// 404
app.use(function(req, res, next){
    var err = new Error('not found');
    err.status = 404;
    next(err);
})

// dev
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next){
        res.send(err.status || 500,{
            message: err.message,
            error: err
        })
    })
}

// pro
app.use(function(err, req, res, next){
    res.send(err.status || 500,{
        message: err.message
    })
})


// start serve
app.listen(port, function(){
    console.log(`Server listen on ${port}...`);
});