/*
 * @Author: miaoqiang
 * @Date: 2018-11-21 13:37:30
 * @Last Modified by: miaoqiang
 * @Last Modified time: 2018-11-23 15:41:15
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Number, default: 0 },
  create_time: { type: String, default: new Date().toLocaleString() }
})

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });

})

const User = mongoose.model('user', UserSchema);
module.exports = User;
