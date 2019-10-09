const fs = require('fs')
const PATH = require('path')
module.exports = {
  uploadImageSingle: (dir = 'uploads') => {
    return (ctx, next) => {
      let file = ctx.request.files.file
      let filename = Date.now() + "-" + file.name
      const reader = fs.createReadStream(file.path);
      let filePath = PATH.join(__dirname, '../public/' + dir) + `/${filename}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      ctx.filename = filename
      return next()
    }
  }
}