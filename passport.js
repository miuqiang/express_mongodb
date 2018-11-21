/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 15:46:05
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-21 15:54:36
 */
const JWT = require('jsonwebtoken');
const { JWT_SWCRET } = require('./config');

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token || '';
  }
}
