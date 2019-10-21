const { Soup } = require('../dao/Models')
const request = require('../utils/request')

const service = {
  async getRandomSoup (ctx, next) {
    let soup = await Soup.aggregate([{ $sample: { size: 1 } }])
    ctx.payload = soup
    next()
  },
  async getTranslateResult (ctx, next) {
    let { text } = ctx.request.query
    let url = `http://fanyi.youdao.com/translate?&i=${text}&doctype=json`
    let result = await request.get('http', encodeURI(url))
    if (result) result = JSON.parse(result)
    ctx.payload = result
    next()
  }
}

module.exports = service