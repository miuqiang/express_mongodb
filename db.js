/*
 * @Author: miaoqiang 
 * @Date: 2018-11-20 14:43:35 
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-20 15:09:26
 */
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'blog_test'
})
// connection.connect();
module.exports = connection;