const CONFIG = require('../config')

const service = {
  async handleUploadImage (ctx, next) {
    let data = {
      imageUrl: `${CONFIG.API_SERVER}/uploads/${ctx.filename}`
    }
    ctx.payload = data
    next()
  }
}
module.exports = service