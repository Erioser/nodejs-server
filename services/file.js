
const responseService = require('./response')

const service = {
  async handleUploadImage (ctx) {
    let data = {
      imageUrl: 'http://localhost:3000/uploads/' + ctx.filename
    }
    responseService.success.call(ctx, data)
  }
}
module.exports = service