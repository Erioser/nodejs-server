const Router = require('koa-router');
const authService = require('../services/auth')
const fileUtils = require('../utils/file')
const router = new Router({
  prefix: '/auth'
});
router.put('/register', authService.createUser)
router.post('/login', authService.loginUser)
router.patch('/password/update', authService.updateUserPassword)
router.patch('/userinfo/update', authService.updateUserInfo)
router.get('/userinfo', authService.getUserInfo)
router.post('/userinfo/headimage/update', fileUtils.uploadImageSingle('userheads'), authService.updateUserHeadImage)


module.exports = router