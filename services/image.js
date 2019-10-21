const imageUtil = require('../utils/image')
const responseService = require('./response')

const service = {
  async getImageTextByUrl (ctx, next) {
    let { url } = ctx.query
    let data = await imageUtil.getImageText({ url })
    ctx.payload = data
    next()
  },
  async getImageTextByImage (ctx, next) {
    const file = ctx.request.files.file // 获取上传文件
    let base64 = await imageUtil.getImageBase64(file)
    let data = await imageUtil.getImageText({ image: base64 })
    ctx.payload = data
    next(data)
  }
}
module.exports = service