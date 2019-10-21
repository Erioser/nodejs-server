const responseService = require('./response')
const service = {
  handleResponse (ctx) {
    let { error, payload } = ctx
    if (error) return responseService.fail.call(ctx, error.code, error.msg)
    return responseService.success.call(ctx, payload)
  }
}
module.exports = service