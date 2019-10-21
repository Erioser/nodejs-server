const Router = require('koa-router')
const FunnyService = require('../services/funny')
const commonService = require('../services/common')
const router = new Router({
  prefix: '/funny'
});

router.get('/soup/random', FunnyService.getRandomSoup, commonService.handleResponse)
router.get('/translate', FunnyService.getTranslateResult, commonService.handleResponse)


module.exports = router