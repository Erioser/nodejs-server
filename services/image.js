const fs = require('fs')
const imageUtil = require('../utils/image')
const responseService = require('./response')

const service = {
  async getImageTextByUrl (ctx) {
    let { url } = ctx.query
    let data = await imageUtil.getImageText({ url })
    responseService.success.call(ctx, data)
  },
  async getImageTextByImage (ctx) {
    const file = ctx.request.files.file // 获取上传文件
    let base64 = await imageUtil.getImageBase64(file)
    let data = await imageUtil.getImageText({ image: base64 })
    responseService.success.call(ctx, data)
  }
}
module.exports = service