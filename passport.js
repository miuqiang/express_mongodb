/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 15:46:05
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-23 10:42:54
 */
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token || '';
    const time_now = Date.now();
    try {
      const decode = JWT.verify(token, JWT_SECRET);
      if (decode.exp < time_now){
        return res.status(401).json({
          status: 401,
          message: '会话超时'
        });
      }
      next();
    } catch (error) {
      return res.status(403).json({
        error_code: 403,
        message: '认证失败'
      })
    }
  }
}
