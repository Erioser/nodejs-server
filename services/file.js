const CONFIG = require('../config')
const responseService = require('./response')

const service = {
  async handleUploadImage (ctx) {
    let data = {
      imageUrl: `${CONFIG.API_SERVER}/uploads/${ctx.filename}`
    }
    responseService.success.call(ctx, data)
  }
}
module.exports = service