/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 15:46:05
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-22 16:59:37
 */
const JWT = require('jsonwebtoken');
const { JWT_SWCRET } = require('./config');

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token || '';
    const time_now = new Date().toLocaleString();
    try {
      const decode = JWT.verify
    } catch (error) {

    }
  }
}
