/*
 * @Author: miaoqiang
 * @Date: 2018-11-20 11:47:25
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-21 14:27:00
 */

const express = require("express");
const router = express.Router();

const UserController = require('../controller/user');


router.route('/v1/user/register')
  .post(UserController.register)

module.exports = router
