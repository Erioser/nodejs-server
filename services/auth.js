const CONFIG = require('../config')
const { User } = require('../dao/Models')
const { setSha1 } = require('../utils/crypto')
const common = require('../utils/common')


const ERROR = {
  UserAlreadyExist: { code: 208, msg: '用户已存在' },
  PasswordError: { code: 400, msg: '密码错误' },
  ParamsError: { code: 401, msg: '参数传递错误' },
  UserNotExist: { code: 404, msg: '用户不存在' }
}


const service = {
  // 创建用户
  async createUser (ctx, next) {
    let { username, password, nickname } = ctx.request.body
    let userCount = await service.judgeUserExist(username)
    if (userCount > 0) {
      ctx.error = ERROR.UserAlreadyExist
      return next()
    }
    let user = new User({
      username,
      password_sha: setSha1(password),
      nickname: nickname || `用户${new Date().getTime()}`
    })
    let result = await user.save()
    ctx.payload = result
    return next()
  },

  // 删除用户
  async deleteUser (ctx, next) {
    let { username } = ctx.request.body
    let exist = await service.judgeUserNotExist(username, ctx, next)
    if (!exist) return false
    let result = await User.deleteOne({ username })
    ctx.payload = result
    next()
  }, 

  // 登陆
  async loginUser (ctx, next) {
    let { username, password } = ctx.request.body
    
    let exist = await service.judgeUserNotExist(username, ctx, next)
    if (!exist) return false

    let result = await User.find({ username, password_sha: setSha1(password) })
    if (result.length) {
      ctx.payload = result[0]
      return next()
    }
    ctx.error = ERROR.PasswordError
    return next()
  },

  // 更新用户信息
  async updateUserInfo (ctx, next) {
    let { username, info } = ctx.request.body
    
    let exist = await service.judgeUserNotExist(username, ctx, next)
    if (!exist) return false

    let param
    try {
      param = typeof info === 'string' ? JSON.parse(info) : info
      delete param.username
    } catch (e) {
      ctx.error = ERROR.ParamsError
      return next()
    }

    let result = await User.findOneAndUpdate({ username }, { 
      $set: common.removeUselessProperty(param)
    }, { new: true })
    ctx.payload = result
    return next()
  },


  // 获取用户信息
  async getUserInfo (ctx, next) {
    let { username } = ctx.request.query
    let exist = await service.judgeUserNotExist(username, ctx, next)
    if (!exist) return false

    let result = await User.find({ username })
    ctx.payload = result[0]
    return next()
  },

  // 获取全部用户信息
  async getUserInfoList (ctx, next) {
    let result = await User.find()
    ctx.payload = result
    return next()
  },

  // 修改密码
  async updateUserPassword (ctx, next) {
    let { username, password, newPassword } = ctx.request.body
    
    let exist = await service.judgeUserNotExist(username, ctx, next)
    if (!exist) return false

    let result = await User.findOneAndUpdate({ username, password_sha: setSha1(password) }, { 
      $set: { password_sha: setSha1(newPassword) }
    }, { new: true })
    if (result) {
      ctx.payload = result
      return next()
    }
    ctx.error = ERROR.PasswordError
    return next()
  },

  // 更改用户头像
  async updateUserHeadImage (ctx, next) {
    let { username } = ctx.request.body

    let exist = await service.judgeUserNotExist(username, ctx, next)
    if (!exist) return false

    let headImage = `${CONFIG.API_SERVER}/userheads/${ctx.filename}`
    let result = await User.findOneAndUpdate({ username }, { 
      $set: { head_image: headImage }
    }, { new: true })
    ctx.payload = result
    return next()
  },



  // 用户不存在
  async judgeUserNotExist (username, ctx, next) {
    let userCount = await service.judgeUserExist(username)
    if (userCount === 0) {
      ctx.error = ERROR.UserNotExist
      next()
      return false
    }
    return true
  },

  // 判断用户是否存在
  async judgeUserExist (username) {
    let list = await User.find({ username })
    return list.length
  }

}

module.exports = service