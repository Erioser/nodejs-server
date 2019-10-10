const Router = require('koa-router');
const imageService = require('../services/image')
const router = new Router({
  prefix: '/aimage'
});
 
router.get('/text/url', imageService.getImageTextByUrl)
router.post('/text/image', imageService.getImageTextByImage)


module.exports = router