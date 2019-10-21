const Router = require('koa-router');
const authService = require('../services/auth')
const commonService = require('../services/common')
const fileUtils = require('../utils/file')
const router = new Router({
  prefix: '/auth'
});
router.put('/register', authService.createUser, commonService.handleResponse)
router.post('/delete', authService.deleteUser, commonService.handleResponse)
router.post('/login', authService.loginUser, commonService.handleResponse)
router.patch('/password/update', authService.updateUserPassword, commonService.handleResponse)
router.patch('/userinfo/update', authService.updateUserInfo, commonService.handleResponse)
router.get('/userinfo', authService.getUserInfo, commonService.handleResponse)
router.get('/userinfo/list', authService.getUserInfoList, commonService.handleResponse)
router.post('/userinfo/headimage/update', fileUtils.uploadImageSingle('userheads'), authService.updateUserHeadImage, commonService.handleResponse)


module.exports = router