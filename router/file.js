const Router = require('koa-router');
const fileUtils = require('../utils/file')
const fileService = require('../services/file')

const router = new Router({
  prefix: '/file'
});

router.post('/image/upload', fileUtils.uploadImageSingle(), fileService.handleUploadImage)


module.exports = router