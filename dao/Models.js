const mongoose = require('./connect')('Hobbies')

// 用户信息
const UserSchema = new mongoose.Schema({
  username: String,
  password_sha: String,
  nickname: String,
  description: String,
  head_image: String,
  phone: String,
  sex: Number,
  birth_time: Number
})

const User = mongoose.model('User', UserSchema)

// 毒鸡汤
const SoupSchema = new mongoose.Schema({
  title: String,
  hots: Number
})

const Soup = mongoose.model('Soup', SoupSchema)

module.exports = {
  User,
  Soup
}