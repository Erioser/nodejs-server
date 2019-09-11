const mongoose = require('./connect')('react-mixture')

const UserSchema = new mongoose.Schema({
  username: String,
  password_sha: String,
  nickname: String
})

const User = mongoose.model('User', UserSchema)

module.exports = {
  User
}