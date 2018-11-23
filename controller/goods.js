/*
 * @Author: miaoqiang
 * @Date: 2018-11-23 15:05:22
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-23 16:58:52
 */
const { PAGE_SIZE, PAGE_NUM } = require('../config');

const Goods = require('../models/goods');

module.exports = {
  getGoods: async (req, res, next) => {
    var page_size = parseInt( req.query.page_size ) || PAGE_SIZE,
      page_num = parseInt ( req.query.page_num ) || PAGE_NUM;

    const counts = await Goods.find({});
    const goods = await Goods.aggregate([
      { $skip : ((page_num-1)*page_size) },
      { $limit: page_size }
    ]);
    res.json({
      counts: counts.length,
      page_num: page_num,
      page_size: page_size,
      rows: goods
    })

  },
  createGoods: async (req, res, next) => {
    const { name, price } = req.body;
    const goods = await Goods.findOne({name: name});
    if (!name) {
      var err = new Error('商品名称不能为空');
      err.status = 400;
      return next(err);
    }
    if (goods) {
      var err = new Error('商品已经存在');
      err.status = 400;
      return next(err);
    }
    if (!price) {
      var err = new Error('商品价格不能为空');
      err.status = 400;
      return next(err);
    }

    const newGoods = new Goods(req.body);
    await newGoods.save();

    res.status(200).json(
      newGoods
    );
  },
  updateGoods: async (req, res, next) => {
    const id = req.params.id;
    const newGoods = req.body;
    try {
      const result = await Goods.findByIdAndUpdate(id, newGoods);
      res.json({
        msg: 'ok'
      })
    } catch (error) {
      var err = new Error('没有此商品');
      err.status = 400;
      return next(err);
    }
  },
  deleteGoods: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Goods.findByIdAndRemove(id);
      res.json({
        msg: 'ok'
      })
    } catch (error) {
      var err = new Error('参数错误');
      err.status = 400;
      return next(err);
    }
  }
}
