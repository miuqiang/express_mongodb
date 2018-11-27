/*
 * @Author: miaoqiang
 * @Date: 2018-11-27 10:42:57
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-27 13:56:03
 */
const { PAGE_SIZE, PAGE_NUM } = require('../config');

const Orders = require('../models/order');
const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  newOrder: async (req, res, next) => {
    const newOrder = new Orders(req.body);
    newOrder.user_id = req.user_id;

    await newOrder.save();
    res.status(200).json(
      newOrder
    );
  },
  getOrder: async (req, res, next) => {
    const user_id = (req.user_id);
    var page_size = parseInt( req.query.page_size ) || PAGE_SIZE,
      page_num = parseInt ( req.query.page_num ) || PAGE_NUM;
    const orders = await Orders.aggregate([
      { $match: { user_id: ObjectId(user_id) }},
      { $project: { goods_name:1, status:1, consignee:1, createAt:1, phone: 1, user_id: 1 } },
      { $skip : ((page_num-1)*page_size) },
      { $limit: page_size }
    ]);

    const counts = await Orders.find({user_id: user_id});
    res.json({
      counts: counts.length,
      page_num: page_num,
      page_size: page_size,
      rows: orders
    })
  },
  getOrderById: async (req, res, next) => {
    const order_id = req.params.id, user_id = req.user_id;
    try {
      const order = await Orders.findById(order_id)
      if (user_id != order.user_id) {
        var err = new Error('没有权限');
        err.status = 400;
        return next(err);
      }
      res.json(
        order
      )
    } catch (error) {
      var err = new Error('没有此订单');
      err.status = 400;
      return next(err);
    }
  }
}
