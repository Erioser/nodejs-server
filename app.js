const LOGM = require('./logs')
const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const routers = require('./router')
const app = new Koa()

app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))

app.use(cors())

app.use(bodyParser())

routers.forEach(router => (
  app.use(router.routes())
     .use(router.allowedMethods())
))

app.listen(3000).on('error', err => {
  LOGM.errorHandler(err)
});