/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 15:46:05
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-27 10:36:48
 */
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token || '';
    const time_now = Date.now();
    try {
      const decode = JWT.verify(token, JWT_SECRET);
      const user_id = decode.sub;
      req.user_id = user_id;
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
