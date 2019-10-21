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


// 一级分类
const ClassifySchema = new mongoose.Schema({
  title: String,
  groups: Array, // { title, id }
  hots: Number
})

const Classify = mongoose.model('Classify', ClassifySchema)


// 二级分类
const GroupSchema = new mongoose.Schema({
  title: String,
  classify_id: String,
  hots: Number
})

const Group = mongoose.model('Group', GroupSchema)


// 标签
const TagSchema = new mongoose.Schema({
  title: String,
  hots: Number
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = {
  User,
  Soup,
  Classify,
  Group,
  Tag
}