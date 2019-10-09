const { Soup } = require('../dao/Models')
const responseService = require('./response')
const request = require('../utils/request')

const service = {
  async getRandomSoup (ctx) {
    let soup = await Soup.aggregate([{ $sample: { size: 1 } }])
    return responseService.success.call(ctx, soup)
  },
  async getTranslateResult (ctx) {
    let { text } = ctx.request.query
    let url = `http://fanyi.youdao.com/translate?&i=${text}&doctype=json`
    let result = await request.get('http', encodeURI(url))
    if (result) result = JSON.parse(result)
    return responseService.success.call(ctx, result)
  }
}

module.exports = service