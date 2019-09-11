const Router = require('koa-router');
const authService = require('../services/auth')
const router = new Router({
  prefix: '/auth'
});
 
router.put('/register', authService.createUser)
router.post('/login', authService.loginUser)


module.exports = router