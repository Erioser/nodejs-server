const { Soup } = require('../dao/Models')
const responseService = require('./response')

const service = {
  async getRandomSoup (ctx) {
    let soup = await Soup.aggregate([{ $sample: { size: 1 } }])
    return responseService.success.call(ctx, soup)
  }
}

module.exports = service