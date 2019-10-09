const Router = require('koa-router')
const SoupService = require('../services/soup')
const router = new Router({
  prefix: '/soup'
});

router.get('/random', SoupService.getRandomSoup)


module.exports = router