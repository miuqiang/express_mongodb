/*
 * @Author: miaoqiang
 * @Date: 2018-11-20 11:47:25
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-22 14:18:23
 */

const express = require("express");
const router = express.Router();

const UserController = require('../controller/user');


router.route('/v1/user/register')
  .post(UserController.register)

router.route('/v1/user/login')
  .post(UserController.login)

router.route('/v1/user')
  .get(UserController.getUser)

router.route('/v1/user/:id')
  .get(UserController.getUserById)

module.exports = router
