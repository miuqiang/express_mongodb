/*
 * @Author: miaoqiang
 * @Date: 2018-11-26 10:10:55
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-27 13:14:16
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSChema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  goods_name: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 0
  },
  consignee: {
    type: String,
    require: true
  }
}, {versionKey: false, timestamps: true})

const Orders = mongoose.model('orders', OrderSChema);
module.exports = Orders;
