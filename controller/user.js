/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 13:52:50
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-22 14:32:10
 */
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, TIMEOUT, PAGE_SIZE, PAGE_NUM } = require('../config');

const User = require('../models/user');

// 签发token
signToken = user => {
  return JWT.sign({
    iss: 'www.example.com',
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
    const foundUser = await User.findOne({ username: username });

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
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
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

    const user = await User.findOne({username: username});

    if (!user) {
      var err = new Error('用户名不存在');
      err.status = 400;
      return next(err);
    }
    bcrypt.compare(password, user.password, function(err, resbonse) {
      // res === true
      if (resbonse) {
        const token = signToken(user._id);
        res.status(200).json({
          token: token
        });
      } else {
        var err = new Error('密码错误');
        err.status = 400;
        return next(err);
      }
    });
  },
  getUser: async (req, res, next) => {
    var page_size = parseInt( req.query.page_size ) || PAGE_SIZE,
      page_num = parseInt ( req.query.page_num ) || PAGE_NUM;
    const user = await User.aggregate([
      { $project: { username: 1, status: 1 } },
      { $skip : ((page_num-1)*page_size) },
      { $limit: page_size }
    ]);
    const counts = await User.find({});
    res.json({
      counts: counts.length,
      page_num: page_num,
      page_size: page_size,
      rows: user
    })
  },
  getUserById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const user = await User.findOne({_id: id});
      res.json(
        user
      )
    } catch (error) {
      var err = new Error('没有此用户');
      err.status = 400;
      return next(err);
    }
  }
}
