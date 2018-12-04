/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 17:02:10
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-12-04 15:35:00
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GoodsSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true, unique: true },
  price:{type: Number, required: true},
  status:{ type: Number, default: 0},
  // create_time: { type: String, default: new Date().toLocaleString() },
  // modified_time: { type: String, default: new Date().toLocaleString() }
},{versionKey: false, timestamps: true})

const Goods = mongoose.model('goods', GoodsSchema);
module.exports = Goods;
