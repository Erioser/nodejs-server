const Router = require('koa-router');
const fileUtils = require('../utils/file')
const fileService = require('../services/file')
const commonService = require('../services/common')
const router = new Router({
  prefix: '/file'
});

router.post('/image/upload', fileUtils.uploadImageSingle(), fileService.handleUploadImage, commonService.handleResponse)


module.exports = router