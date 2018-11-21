/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 13:37:30
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-21 16:12:48
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status:{ type: String, default: '0'},
  create_time: { type: String, default: new Date().toLocaleString() }
})

const User = mongoose.model('user', UserSchema);
module.exports = User;
