
const { User } = require('../dao/Models')
const responseService = require('./response')
const { setSha1 } = require('../utils/crypto')

const service = {

  async createUser (ctx, next) {
    let { username, password, nickname } = ctx.request.body
    let userCount = await service.judgeUserExist(username)
    if (userCount > 0) {
      return responseService.fail.call(ctx, 208, '用户存在')
    }
    let user = new User({
      username,
      password_sha: setSha1(password),
      nickname: nickname || '用户-' + (userCount + 1)
    })
    let result = await user.save()
    responseService.success.call(ctx, result)
  },
  async loginUser (ctx) {
    let { username, password } = ctx.request.body
    let userCount = await service.judgeUserExist(username)
    if (userCount === 0) {
      return responseService.fail.call(ctx, 404, '用户不存在')
    }
    let result = await User.find({ username, password_sha: setSha1(password) })
    if (result.length) {
      return responseService.success.call(ctx, result[0])
    }
    return responseService.fail.call(ctx, 401, '密码错误')
  },
  async judgeUserExist (username) {
    let list = await User.find({ username })
    return list.length
  }

}

module.exports = service