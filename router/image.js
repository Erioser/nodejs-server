const Router = require('koa-router');
const imageService = require('../services/image')
const commonService = require('../services/common')
const router = new Router({
  prefix: '/aimage'
});
 
router.get('/text/url', imageService.getImageTextByUrl, commonService.handleResponse)
router.post('/text/image', imageService.getImageTextByImage, commonService.handleResponse)


module.exports = router