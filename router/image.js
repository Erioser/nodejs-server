const Router = require('koa-router');
const imageService = require('../services/image')
const router = new Router({
  prefix: '/image'
});
 
router.get('/text/url', imageService.getImageTextByUrl)
router.post('/text/image', imageService.getImageTextByImage)
// router.post('/text/url', authService.loginUser)


module.exports = router