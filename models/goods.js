/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 17:02:10
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-23 16:38:34
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price:{type: Number, required: true},
  status:{ type: Number, default: 0},
  // create_time: { type: String, default: new Date().toLocaleString() },
  // modified_time: { type: String, default: new Date().toLocaleString() }
},{versionKey: false, timestamps: true})

const Goods = mongoose.model('goods', GoodsSchema);
module.exports = Goods;
