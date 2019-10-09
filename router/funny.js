const Router = require('koa-router')
const FunnyService = require('../services/funny')
const router = new Router({
  prefix: '/funny'
});

router.get('/soup/random', FunnyService.getRandomSoup)
router.get('/translate', FunnyService.getTranslateResult)


module.exports = router