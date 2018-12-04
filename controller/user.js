/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 13:52:50
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-12-04 16:35:03
 */
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, TIME_OUT, PAGE_SIZE, PAGE_NUM } = require('../config');

const User = require('../models/user');

// 签发token
signToken = user => {
  return JWT.sign({
    iss: 'www.example.com',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().getTime() + TIME_OUT
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
    const token = signToken(newUser);

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
    bcrypt.compare(password.toString(), user.password, function(err, resbonse) {
      // res === true
      if (resbonse) {
        const token = signToken(user._id);
        res.status(200).json({
          message:'ok',
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
      page_num = parseInt ( req.query.page_num ) || PAGE_NUM,
      status = req.query.status == '' ? {}:{status: parseInt( req.query.status )};
    const user = await User.aggregate([
      { $match : status },
      { $project: { username: 1, status: 1 } },
      { $skip : ((page_num-1)*page_size) },
      { $limit: page_size }
    ]);

    const counts = await User.find(status).count();

    res.json({
      counts: counts,
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
  },
  UserEdit: async (req, res, next) => {
    const id = req.params.id;
    const status = parseInt( req.body.status );
    try {
      const user = await User.updateOne(
        { "_id": id },
        { $set:  {"status":  status}}
      );

      res.json({
        msg: 'ok'
      })
    } catch (error) {
      var err = new Error('没有此用户');
      err.status = 400;
      return next(err);
    }
  }
}
