const CONFIG = require('../config')
const { User } = require('../dao/Models')
const responseService = require('./response')
const { setSha1 } = require('../utils/crypto')
const common = require('../utils/common')

const service = {
  // 创建用户
  async createUser (ctx) {
    let { username, password, nickname } = ctx.request.body
    let userCount = await service.judgeUserExist(username)
    if (userCount > 0) {
      return responseService.fail.call(ctx, 208, '用户已存在')
    }
    let user = new User({
      username,
      password_sha: setSha1(password),
      nickname: nickname || '用户-' + (userCount + 1)
    })
    let result = await user.save()
    responseService.success.call(ctx, result)
  },

  // 登陆
  async loginUser (ctx) {
    let { username, password } = ctx.request.body
    
    let exist = await service.judgeUserNotExist(username, ctx)
    if (!exist) return false

    let result = await User.find({ username, password_sha: setSha1(password) })
    if (result.length) {
      return responseService.success.call(ctx, result[0])
    }
    return responseService.fail.call(ctx, 401, '密码错误')
  },

  // 更新用户信息
  async updateUserInfo (ctx) {
    let { username, info } = ctx.request.body
    
    let exist = await service.judgeUserNotExist(username, ctx)
    if (!exist) return false

    let param
    try {
      param = typeof info === 'string' ? JSON.parse(info) : info
      delete param.username
    } catch (e) {
      return responseService.fail.call(ctx, 401, '参数传递错误')
    }

    let result = await User.findOneAndUpdate({ username }, { 
      $set: common.removeUselessProperty(param)
    }, { new: true })

    responseService.success.call(ctx, result)
  },


  // 获取用户信息
  async getUserInfo (ctx) {
    let { username } = ctx.request.query
    
    let exist = await service.judgeUserNotExist(username, ctx)
    if (!exist) return false

    let result = await User.find({ username })
    return responseService.success.call(ctx, result[0])
  },

  // 修改密码
  async updateUserPassword (ctx) {
    let { username, password, newPassword } = ctx.request.body
    
    let exist = await service.judgeUserNotExist(username, ctx)
    if (!exist) return false

    let result = await User.findOneAndUpdate({ username, password_sha: setSha1(password) }, { 
      $set: { password_sha: setSha1(newPassword) }
    }, { new: true })
    if (result) {
      return responseService.success.call(ctx, result)
    }
    return responseService.fail.call(ctx, 401, '密码错误')
  },

  // 更改用户头像
  async updateUserHeadImage (ctx) {
    let { username } = ctx.request.body

    let exist = await service.judgeUserNotExist(username, ctx)
    if (!exist) return false

    let headImage = `${CONFIG.API_SERVER}/userheads/${ctx.filename}`
    let result = await User.findOneAndUpdate({ username }, { 
      $set: { head_image: headImage }
    }, { new: true })
    return responseService.success.call(ctx, result)
  },



  // 用户不存在
  async judgeUserNotExist (username, ctx) {
    let userCount = await service.judgeUserExist(username)
    if (userCount === 0) {
      responseService.fail.call(ctx, 404, '用户不存在')
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