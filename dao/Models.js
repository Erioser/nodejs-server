const mongoose = require('./connect')('Hobbies')

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

module.exports = {
  User
}