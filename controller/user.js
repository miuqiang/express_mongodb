/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 13:52:50
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-21 15:43:24
 */
const JWT = require('jsonwebtoken');
const { JWT_SECRET, TIMEOUT } = require('../config');

const User = require('../models/user');

// 签发token
signToken = user =>{
  return JWT.sign({
    iss: 'shunjiefw',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().getTime() + TIMEOUT
  }, JWT_SECRET)
}

module.exports = {
  /**
   * register
   */
  register: async (req, res, next) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({username: username});

    if (!username) {
      var err = new Error('用户名不能为空');
      err.status = 400;
      return next(err);
    }
    if (!password) {
      var err = new Error('密码不能为空');
      err.status = 400;
      return next(err);
    }
    if (foundUser) {
      var err = new Error('该账号已经被注册');
      err.status = 400;
      return next(err);
    }

    const newUser = new User(req.body);
    await newUser.save();
    const token = signToken(newUser._id);

    res.status(200).json({
      id: newUser._id,
      token: token,
      message: '注册成功'
    });
  }
}
