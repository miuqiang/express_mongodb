/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 17:02:10
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-21 17:03:34
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status:{ type: String, default: '0'},
  create_time: { type: String, default: new Date().toLocaleString() }
})

const User = mongoose.model('user', GoodsSchema);
module.exports = Goods;
