/*
 * @Author: miaoqiang
 * @Date: 2018-11-20 11:47:25
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-23 16:59:28
 */

const express = require("express");
const router = express.Router();
const passport = require('../passport');

const UserController = require('../controller/user');
const GoodsController = require('../controller/goods');

// user
router.route('/v1/user/register')
  .post(UserController.register)

router.route('/v1/user/login')
  .post(UserController.login)

router.route('/v1/user')
  .get(UserController.getUser)

router.route('/v1/user/:id')
  .get(UserController.getUserById)
  .put(passport.authentication, UserController.UserEdit)


// goods
router.route('/v1/goods')
  .get(GoodsController.getGoods)
  .post(GoodsController.createGoods)
router.route('/v1/goods/:id')
  .put(GoodsController.updateGoods)
  .delete(GoodsController.deleteGoods)

module.exports = router
