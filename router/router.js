/*
 * @Author: miaoqiang 
 * @Date: 2018-11-20 11:47:25 
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-20 15:41:39
 */

var express = require("express");
var router = express.Router();

var userRouter = router.get("/user", function (req, res) {
    return res.status(200).json(
        {
            message: 'user'
        }
    )
});

module.exports = userRouter