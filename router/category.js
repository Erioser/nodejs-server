const Router = require('koa-router')
const categoryService = require('../services/category')
const commonService = require('../services/common')
const router = new Router({
  prefix: '/category'
});

router.get('/classify/list', categorySerremoveTagvice.getClassifyList, commonService.handleResponse)
router.get('/classify', categoryService.getClassifyById, commonService.handleResponse)
router.put('/classify/create', categoryService.createClassify, commonService.handleResponse)
router.post('/classify/delete', categoryService.removeClassifyById, commonService.handleResponse)
router.put('/group/create', categoryService.createGroup, commonService.handleResponse)
router.post('/group/delete', categoryService.removeGroupFromClassify, commonService.handleResponse)
router.put('/tag/create', categoryService.createTag, commonService.handleResponse)
router.post('/tage/delete', categoryService., commonService.handleResponse)


module.exports = router