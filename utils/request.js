

module.exports = {
  get (partocol = 'http', params) {
    return new Promise((resolve, reject) => {
      const rq = require(partocol)
      const req = rq.get(params, function (res) {
          let rawData = ''
          res.on('data', (chunk) => { rawData += chunk })
          res.on('end', () => resolve(rawData))
      })
      req.on('error', (e) => { reject(`请求遇到问题: ${e.message}`)})   
    })
    
  },
  post (partocol = 'http', data, options) {
    return new Promise((resolve, reject) => {
      const rq = require(partocol)
      const req = rq.request(options, function (res) {
        let rawData = ''
        res.on('data', (chunk) => { rawData += chunk })
        res.on('end', () => resolve(rawData))
      })
      req.on('error', (e) => { reject(`请求遇到问题: ${e.message}`)})   
      // 将数据写入请求主体。
      req.write(data)
      req.end()
    })
    
  }
}
